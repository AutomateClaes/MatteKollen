import { create } from 'zustand';

// Auth- och profilläge för enheten. Vald profil sparas per enhet i
// localStorage så att barnet slipper välja om vid varje start.
const PROFILE_KEY = 'mk-selected-profile';

const readProfile = () => {
    try {
        return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
    } catch {
        return null;
    }
};

export const useAuthStore = create((set) => ({
    authLoading: true,
    user: null,
    // { id, name } — profilen som denna enhet tillhör
    profile: readProfile(),
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
}));
