import { create } from 'zustand';

// Auth- och profilläge för enheten. Vald profil sparas per enhet i
// localStorage så att barnet slipper välja om vid varje start.
const PROFILE_KEY = 'mk-selected-profile';
const LINKED_KEY = 'mk-linked-family';

const readJson = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || null;
    } catch {
        return null;
    }
};

export const useAuthStore = create((set) => ({
    authLoading: true,
    user: null,
    // { id, name } — profilen som denna enhet tillhör (förälderns egen enhet)
    profile: readJson(PROFILE_KEY),
    // { familyUid, profileId, profileName } — barnenhet kopplad via förfrågan
    linkedFamily: readJson(LINKED_KEY),
    syncState: 'idle', // idle | loading | synced | error

    setUser: (user) => set({ user, authLoading: false }),
    setSyncState: (syncState) => set({ syncState }),

    selectProfile: (profile) => {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        set({ profile });
    },

    clearProfile: () => {
        localStorage.removeItem(PROFILE_KEY);
        set({ profile: null });
    },

    setLinkedFamily: (linkedFamily) => {
        localStorage.setItem(LINKED_KEY, JSON.stringify(linkedFamily));
        set({ linkedFamily });
    },

    clearLinkedFamily: () => {
        localStorage.removeItem(LINKED_KEY);
        set({ linkedFamily: null });
    },
}));
