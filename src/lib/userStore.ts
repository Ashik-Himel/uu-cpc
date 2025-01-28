import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
  studentId: number;
  batch: number;
  section?: string;
  role: "member" | "admin" | "super-admin";
}

interface UserStore {
  user: User | null;
  userLoaded: boolean;
  setUser: (newUser: User | null) => void;
  setUserLoaded: (isLoaded: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  userLoaded: false,
  setUser: (newUser) =>
    set({
      user: newUser,
      userLoaded: true,
    }),
  setUserLoaded: (isLoaded) =>
    set({
      userLoaded: isLoaded,
    }),
}));
