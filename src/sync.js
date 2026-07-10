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
    query, where, onSnapshot, serverTimestamp, deleteDoc,
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

// Skicka förfrågan till förälderns e-post och vänta på godkännande
export const requestDeviceLink = async (parentEmail) => {
    if (!auth.currentUser) {
        await signInAnonymously(auth);
    }
    const deviceUid = auth.currentUser.uid;
    await setDoc(doc(db, 'linkRequests', deviceUid), {
        deviceUid,
        parentEmail: parentEmail.trim().toLowerCase(),
        status: 'pending',
        createdAt: serverTimestamp(),
    });
    watchDeviceLink();
};

// Lyssna på svaret — när föräldern godkänt aktiveras synken automatiskt
export const watchDeviceLink = () => {
    if (!auth.currentUser) return;
    if (unsubscribeLinkWatch) unsubscribeLinkWatch();
    unsubscribeLinkWatch = onSnapshot(doc(db, 'linkRequests', auth.currentUser.uid), async (snap) => {
        const data = snap.data();
        if (data?.status === 'approved') {
            unsubscribeLinkWatch();
            unsubscribeLinkWatch = null;
            useAuthStore.getState().setLinkedFamily({
                familyUid: data.familyUid,
                profileId: data.profileId,
                profileName: data.profileName,
            });
            deleteDoc(doc(db, 'linkRequests', auth.currentUser.uid)).catch(() => { });
            await startSyncingTarget(false);
        }
    }, () => { });
};

// Har enheten en väntande förfrågan?
export const getPendingLinkRequest = async () => {
    if (!auth.currentUser) return null;
    try {
        const snap = await getDoc(doc(db, 'linkRequests', auth.currentUser.uid));
        return snap.exists() && snap.data().status === 'pending' ? snap.data() : null;
    } catch {
        return null;
    }
};

export const cancelDeviceLink = async () => {
    if (unsubscribeLinkWatch) unsubscribeLinkWatch();
    unsubscribeLinkWatch = null;
    if (auth.currentUser) {
        await deleteDoc(doc(db, 'linkRequests', auth.currentUser.uid)).catch(() => { });
    }
};

export const unlinkDevice = () => {
    stopSync();
    useAuthStore.getState().clearLinkedFamily();
};

// --- Parkoppling: förälderns sida ---

export const fetchPendingLinkRequests = async () => {
    const { user } = useAuthStore.getState();
    if (!user?.email) return [];
    const snap = await getDocs(query(
        collection(db, 'linkRequests'),
        where('parentEmail', '==', user.email.toLowerCase())
    ));
    return snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(r => r.status === 'pending');
};

export const approveLinkRequest = async (request, profile) => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    await setDoc(doc(db, 'families', user.uid, 'grants', request.deviceUid), {
        profileId: profile.id,
        createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, 'linkRequests', request.deviceUid), {
        status: 'approved',
        familyUid: user.uid,
        profileId: profile.id,
        profileName: profile.name,
    });
};

export const denyLinkRequest = async (request) => {
    await deleteDoc(doc(db, 'linkRequests', request.deviceUid));
};

// --- Profiler ---

export const listProfiles = async () => {
    const { user } = useAuthStore.getState();
    if (!user) return [];
    const snap = await getDocs(collection(db, 'families', user.uid, 'profiles'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const createProfile = async (name) => {
    const { user } = useAuthStore.getState();
    if (!user) return null;
    const ref = await addDoc(collection(db, 'families', user.uid, 'profiles'), {
        name,
        createdAt: serverTimestamp(),
    });
    return { id: ref.id, name };
};

// Hämta alla profilers framsteg — för föräldraöversikten
export const fetchFamilyOverview = async () => {
    const { user } = useAuthStore.getState();
    if (!user) return [];
    const profiles = await listProfiles();
    const overview = [];
    for (const p of profiles) {
        const snap = await getDoc(stateDocRef(user.uid, p.id));
        const s = snap.exists() ? snap.data() : null;
        const history = s?.history || [];
        const solved = history.filter(e => e.isCorrect || e.taskData?.solvedAfterRetry);
        overview.push({
            ...p,
            points: s?.points ?? 0,
            totalAnswers: history.length,
            totalSolved: solved.length,
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
                // Väntande förfrågan? Fortsätt lyssna efter godkännande
                const pending = await getPendingLinkRequest();
                if (pending) watchDeviceLink();
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
