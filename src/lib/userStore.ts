import { create } from "zustand";

interface User {
  available: boolean;
  role: "member" | "admin" | "super-admin";
}

interface UserStore {
  user: User | null;
  userLoaded: boolean;
  verifyWarnDisappear: boolean;
  setUser: (userState: User | null) => void;
  setUserLoaded: (isLoaded: boolean) => void;
  setVerifyWarnDisappear: (isWarnDisappear: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  userLoaded: false,
  verifyWarnDisappear: false,
  setUser: (userState) =>
    set({
      user: userState,
      userLoaded: true,
    }),
  setUserLoaded: (isLoaded) =>
    set({
      userLoaded: isLoaded,
    }),
  setVerifyWarnDisappear: (isWarnDisappear) =>
    set({
      verifyWarnDisappear: isWarnDisappear,
    }),
}));
