import { create } from "zustand";

interface sidebarToggle {
  isToggle: boolean;
  sidebarToggle: () => void;
}

export const usesidebarToggleStore = create<sidebarToggle>((set) => ({
  isToggle: true,
  sidebarToggle: () => set((state) => ({ isToggle: !state.isToggle })),
}));
