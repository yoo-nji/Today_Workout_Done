import { create } from "zustand";

interface Auth {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useAuth = create<Auth>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  login: (accessToken: string) => set({ isLoggedIn: true, accessToken }),
  logout: () => set({ isLoggedIn: false, accessToken: null }),
}));
