import { create } from "zustand";

interface Auth {
  user: UserInfo | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
  setUser: (u: UserInfo) => void;
}

export const useAuth = create<Auth>((set) => ({
  user: null,
  isLoggedIn: false,
  accessToken: null,
  login: (accessToken: string) => set({ isLoggedIn: true, accessToken }),
  logout: () => set({ isLoggedIn: false, accessToken: null }),
  setUser: (u: UserInfo) => set({ user: u }),
}));
