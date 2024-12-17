import { create } from "zustand";

interface DarkModeStore {
  isDark: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeStore>((set) => ({
  isDark: false,
  toggleDarkMode: () => set((state) => ({ isDark: !state.isDark })),
}));
