import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    user: any | null; // Can refine this type later based on backend User entity
    _hasHydrated: boolean;
    setToken: (token: string) => void;
    setUser: (user: any) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
    setHasHydrated: (state: boolean) => void;
}


export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            _hasHydrated: false,
            setToken: (token) => set({ token }),
            setUser: (user) => set({ user }),
            logout: () => set({ token: null, user: null }),
            isAuthenticated: () => !!get().token,
            setHasHydrated: (state) => set({ _hasHydrated: state }),
        }),
        {
            name: 'auth-storage', // name of the item in the storage (must be unique)
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
