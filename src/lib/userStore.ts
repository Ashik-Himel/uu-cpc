import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  userLoaded: false,
  setUser: (newUser: object) =>
    set({
      user: newUser,
      userLoaded: true,
    }),
  setUserLoaded: (isLoaded: boolean) =>
    set({
      userLoaded: isLoaded,
    }),
}));
