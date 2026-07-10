// =============================================================
// Molnsynk: kopplar ihop Firebase Auth + Firestore med appens
// zustand-store. Datamodell:
//   families/{uid}                          — förälderns familj
//   families/{uid}/profiles/{pid}           — barnprofil { name }
//   families/{uid}/profiles/{pid}/state/app — profilens framsteg
//   families/{uid}/grants/{deviceUid}       — godkänd enhetskoppling
//   linkRequests/{deviceUid}                — väntande parkoppling
//
// Två sätt att synka:
//  1. Förälderns enhet: Google-inloggning + vald profil
//  2. Barnets enhet: anonym inloggning + godkänd koppling (grant)
// =============================================================
import {
    onAuthStateChanged, signInWithPopup, signInWithRedirect,
    getRedirectResult, signOut, signInAnonymously,
} from 'firebase/auth';
import {
    doc, getDoc, setDoc, addDoc, updateDoc, collection, getDocs,
    onSnapshot, serverTimestamp, deleteDoc,
} from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';
import { useStore } from './store/useStore';
import { useAuthStore } from './store/useAuthStore';

const MAX_SYNCED_HISTORY = 1500;

let saveTimer = null;
let applyingCloud = false;
let unsubscribeStore = null;
let unsubscribeLinkWatch = null;

// Vart ska denna enhet synka? Förälder med vald profil, eller kopplad barnenhet
const getSyncTarget = () => {
    const { user, profile, linkedFamily } = useAuthStore.getState();
    if (user && !user.isAnonymous && profile) {
        return { familyUid: user.uid, profileId: profile.id };
    }
    if (user && user.isAnonymous && linkedFamily) {
        return { familyUid: linkedFamily.familyUid, profileId: linkedFamily.profileId };
    }
    return null;
};

const stateDocRef = (familyUid, profileId) =>
    doc(db, 'families', familyUid, 'profiles', profileId, 'state', 'app');

const pickSyncedState = () => {
    const s = useStore.getState();
    return {
        activeTasks: s.activeTasks,
        history: s.history.slice(0, MAX_SYNCED_HISTORY),
        points: Number.isFinite(s.points) ? s.points : 0,
        masteryThreshold: s.masteryThreshold,
        updatedAt: serverTimestamp(),
    };
};

const saveNow = async () => {
    const target = getSyncTarget();
    if (!target) return;
    try {
        await setDoc(stateDocRef(target.familyUid, target.profileId), pickSyncedState());
        useAuthStore.getState().setSyncState('synced');
    } catch (err) {
        console.error('Synk misslyckades', err);
        useAuthStore.getState().setSyncState('error');
    }
};

const scheduleSave = () => {
    if (applyingCloud) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 2000);
};

// Börja lyssna på ändringar i spel-storen och synka upp dem
const startWatchingStore = () => {
    if (unsubscribeStore) unsubscribeStore();
    unsubscribeStore = useStore.subscribe((state, prev) => {
        if (state.history !== prev.history ||
            state.activeTasks !== prev.activeTasks ||
            state.points !== prev.points ||
            state.masteryThreshold !== prev.masteryThreshold) {
            scheduleSave();
        }
    });
};

// Ladda målets framsteg från molnet och börja synka.
// migrateLocalIfEmpty: om molnet saknar data blir enhetens lokala
// framsteg startläget (används när föräldern skapar en ny profil)
const startSyncingTarget = async (migrateLocalIfEmpty) => {
    const target = getSyncTarget();
    if (!target) return;
    useAuthStore.getState().setSyncState('loading');
    try {
        const snap = await getDoc(stateDocRef(target.familyUid, target.profileId));
        if (snap.exists()) {
            const cloud = snap.data();
            applyingCloud = true;
            useStore.setState({
                activeTasks: cloud.activeTasks || [],
                history: cloud.history || [],
                points: Number.isFinite(cloud.points) ? cloud.points : 0,
                masteryThreshold: cloud.masteryThreshold || 5,
            });
            applyingCloud = false;
            useAuthStore.getState().setSyncState('synced');
        } else if (migrateLocalIfEmpty) {
            await saveNow();
        } else {
            useAuthStore.getState().setSyncState('synced');
        }
        startWatchingStore();
    } catch (err) {
        console.error('Kunde inte ladda profil', err);
        useAuthStore.getState().setSyncState('error');
    }
};

// Förälderns enhet: aktivera vald profil
export const activateProfile = async (profile) => {
    useAuthStore.getState().selectProfile(profile);
    await startSyncingTarget(true);
};

export const stopSync = () => {
    if (unsubscribeStore) unsubscribeStore();
    unsubscribeStore = null;
    clearTimeout(saveTimer);
};

// --- Parkoppling: barnets enhet ---

const LINK_CODE_KEY = 'mk-link-code';

// "Logga in barn": generera en sexsiffrig kod som föräldern slår in.
// Returnerar koden; enheten lyssnar sedan på godkännandet.
export const startChildLogin = async () => {
    if (!auth.currentUser) {
        await signInAnonymously(auth);
    }
    const deviceUid = auth.currentUser.uid;
    // Försök tills en ledig kod hittas (krock är extremt osannolik)
    for (let attempt = 0; attempt < 5; attempt++) {
        const code = String(Math.floor(100000 + Math.random() * 900000));
        try {
            await setDoc(doc(db, 'linkRequests', code), {
                deviceUid,
                status: 'pending',
                createdAt: serverTimestamp(),
            });
            localStorage.setItem(LINK_CODE_KEY, code);
            watchDeviceLink(code);
            return code;
        } catch (err) {
            // Upptagen kod ger permission denied (update nekas) — prova nästa
            if (attempt === 4) throw err;
        }
    }
    return null;
};

// Lyssna på svaret — när föräldern godkänt aktiveras synken automatiskt
export const watchDeviceLink = (code) => {
    if (unsubscribeLinkWatch) unsubscribeLinkWatch();
    unsubscribeLinkWatch = onSnapshot(doc(db, 'linkRequests', code), async (snap) => {
        const data = snap.data();
        if (data?.status === 'approved' && data.deviceUid === auth.currentUser?.uid) {
            unsubscribeLinkWatch();
            unsubscribeLinkWatch = null;
            localStorage.removeItem(LINK_CODE_KEY);
            useAuthStore.getState().setLinkedFamily({
                familyUid: data.familyUid,
                profileId: data.profileId,
                profileName: data.profileName,
            });
            deleteDoc(doc(db, 'linkRequests', code)).catch(() => { });
            await startSyncingTarget(false);
        }
    }, () => { });
};

// Pågående kodvisning att återuppta efter omstart?
export const getPendingLinkCode = async () => {
    const code = localStorage.getItem(LINK_CODE_KEY);
    if (!code || !auth.currentUser) return null;
    try {
        const snap = await getDoc(doc(db, 'linkRequests', code));
        if (snap.exists() && snap.data().deviceUid === auth.currentUser.uid
            && snap.data().status === 'pending') {
            return code;
        }
    } catch { /* borttagen eller ej vår */ }
    localStorage.removeItem(LINK_CODE_KEY);
    return null;
};

export const cancelDeviceLink = async () => {
    if (unsubscribeLinkWatch) unsubscribeLinkWatch();
    unsubscribeLinkWatch = null;
    const code = localStorage.getItem(LINK_CODE_KEY);
    localStorage.removeItem(LINK_CODE_KEY);
    if (code) {
        await deleteDoc(doc(db, 'linkRequests', code)).catch(() => { });
    }
};

export const unlinkDevice = () => {
    stopSync();
    useAuthStore.getState().clearLinkedFamily();
};

// --- Parkoppling: förälderns sida ---

// Koppla en barnenhet till en profil med koden från barnets skärm
export const linkDeviceByCode = async (code, profile) => {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('inte inloggad');
    const ref = doc(db, 'linkRequests', code.trim());
    const snap = await getDoc(ref);
    if (!snap.exists() || snap.data().status !== 'pending') {
        throw new Error('Ingen väntande enhet med den koden. Kontrollera att koden fortfarande visas på barnets skärm.');
    }
    const { deviceUid } = snap.data();
    await setDoc(doc(db, 'families', user.uid, 'grants', deviceUid), {
        profileId: profile.id,
        createdAt: serverTimestamp(),
    });
    await updateDoc(ref, {
        status: 'approved',
        familyUid: user.uid,
        profileId: profile.id,
        profileName: profile.name,
    });
};

// --- Profiler ---

export const listProfiles = async () => {
    const { user } = useAuthStore.getState();
    if (!user) return [];
    const snap = await getDocs(collection(db, 'families', user.uid, 'profiles'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const createProfile = async (name, age) => {
    const { user } = useAuthStore.getState();
    if (!user) return null;
    const profileData = {
        name,
        createdAt: serverTimestamp(),
    };
    if (age) profileData.age = age;
    const ref = await addDoc(collection(db, 'families', user.uid, 'profiles'), profileData);
    return { id: ref.id, name, age: age || null };
};

// Hämta alla profilers framsteg — för föräldrapanelen
export const fetchFamilyOverview = async () => {
    const { user } = useAuthStore.getState();
    if (!user) return [];
    const profiles = await listProfiles();
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const overview = [];
    for (const p of profiles) {
        const snap = await getDoc(stateDocRef(user.uid, p.id));
        const s = snap.exists() ? snap.data() : null;
        const history = s?.history || [];
        // Ett svar per fråga: retry-poster är extra rader för samma fråga
        const isAnswerEntry = (e) => !e.taskData?.solvedAfterRetry;
        const isSolvedEntry = (e) => e.isCorrect || e.taskData?.solvedAfterRetry;
        const weekHistory = history.filter(e => (e.timestamp || 0) > weekAgo);
        overview.push({
            ...p,
            points: s?.points ?? 0,
            totalAnswers: history.filter(isAnswerEntry).length,
            totalSolved: history.filter(isSolvedEntry).length,
            weekAnswers: weekHistory.filter(isAnswerEntry).length,
            weekSolved: weekHistory.filter(isSolvedEntry).length,
            weekRevealed: weekHistory.filter(e => e.taskData?.revealedAnswer).length,
            revealedCount: history.filter(e => e.taskData?.revealedAnswer).length,
            lastActivity: history[0]?.timestamp || null,
        });
    }
    return overview;
};

// --- Auth ---

export const loginWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (err) {
        // Popup kan blockeras i installerade PWA:er (främst iOS) — fall
        // tillbaka på redirect-flödet
        if (err.code === 'auth/popup-blocked' || err.code === 'auth/operation-not-supported-in-this-environment') {
            await signInWithRedirect(auth, googleProvider);
        } else {
            throw err;
        }
    }
};

export const logout = async () => {
    stopSync();
    useAuthStore.getState().clearProfile();
    await signOut(auth);
};

// Startas en gång vid appstart
export const initAuth = () => {
    getRedirectResult(auth).catch(() => { });
    onAuthStateChanged(auth, async (user) => {
        useAuthStore.getState().setUser(user);
        if (!user) return;

        if (user.isAnonymous) {
            const { linkedFamily } = useAuthStore.getState();
            if (linkedFamily) {
                // Kopplad barnenhet: återuppta synken
                startSyncingTarget(false);
            } else {
                // Pågående kodvisning? Fortsätt lyssna efter godkännande
                const code = await getPendingLinkCode();
                if (code) watchDeviceLink(code);
            }
            return;
        }

        // Förälder: se till att familjedokumentet finns
        setDoc(doc(db, 'families', user.uid), {
            email: user.email,
            createdAt: serverTimestamp(),
        }, { merge: true }).catch(() => { });
        const { profile } = useAuthStore.getState();
        if (profile) startSyncingTarget(true);
    });
};
