import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (authData: any) =>
        set({
          token: authData.token,
          user: authData.user,
        }),
      logOut: () =>
        set({
          token: null,
          user: null,
        }),
    }),
    {
      name: 'rate-checker-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
