// =============================================================
// Molnsynk: kopplar ihop Firebase Auth + Firestore med appens
// zustand-store. Datamodell:
//   families/{uid}                          — förälderns familj
//   families/{uid}/profiles/{pid}           — barnprofil { name }
//   families/{uid}/profiles/{pid}/state/app — profilens framsteg
// Strategi: läs vid profilval, spara (debounce) vid varje ändring.
// =============================================================
import {
    onAuthStateChanged, signInWithPopup, signInWithRedirect,
    getRedirectResult, signOut,
} from 'firebase/auth';
import {
    doc, getDoc, setDoc, addDoc, collection, getDocs,
    serverTimestamp, deleteDoc,
} from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';
import { useStore } from './store/useStore';
import { useAuthStore } from './store/useAuthStore';

const MAX_SYNCED_HISTORY = 1500;

let saveTimer = null;
let applyingCloud = false;
let unsubscribeStore = null;

const stateDocRef = (uid, profileId) =>
    doc(db, 'families', uid, 'profiles', profileId, 'state', 'app');

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
    const { user, profile } = useAuthStore.getState();
    if (!user || !profile) return;
    try {
        await setDoc(stateDocRef(user.uid, profile.id), pickSyncedState());
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

// Ladda vald profils framsteg från molnet (eller migrera upp lokalt state
// om profilen är ny) och börja synka
export const activateProfile = async (profile) => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    useAuthStore.getState().setSyncState('loading');
    useAuthStore.getState().selectProfile(profile);
    try {
        const snap = await getDoc(stateDocRef(user.uid, profile.id));
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
        } else {
            // Ny profil: nuvarande lokala framsteg blir profilens startläge
            await saveNow();
        }
        startWatchingStore();
    } catch (err) {
        console.error('Kunde inte ladda profil', err);
        useAuthStore.getState().setSyncState('error');
    }
};

export const stopSync = () => {
    if (unsubscribeStore) unsubscribeStore();
    unsubscribeStore = null;
    clearTimeout(saveTimer);
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

export const deleteProfile = async (profileId) => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    await deleteDoc(stateDocRef(user.uid, profileId));
    await deleteDoc(doc(db, 'families', user.uid, 'profiles', profileId));
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
        if (user) {
            // Se till att familjedokumentet finns
            setDoc(doc(db, 'families', user.uid), {
                email: user.email,
                createdAt: serverTimestamp(),
            }, { merge: true }).catch(() => { });
            // Återuppta synk om enheten redan har en vald profil
            const { profile } = useAuthStore.getState();
            if (profile) activateProfile(profile);
        }
    });
};
