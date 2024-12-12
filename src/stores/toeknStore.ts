import { create } from "zustand";
import { persist } from "zustand/middleware";
interface Token {
  accessToken: string | null;
  setToken: (accessToken: string) => void;
}
export const useToken = create(
  persist<Token>(
    (set) => ({
      accessToken: null,
      setToken: (accessToken: string) => set({ accessToken }),
    }),
    {
      name: "auth-storage", // 로컬 스토리지에 저장될 키 이름
    }
  )
);
