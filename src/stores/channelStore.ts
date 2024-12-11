import { create } from "zustand";

interface ChannelStore {
  channelId: string;
  setChannelId: (channelId: string) => void;
}

export const useChannelStore = create<ChannelStore>((set) => ({
  channelId: "6757a3a7ce18fa02ded5c758",
  setChannelId: (channelId: string) => set({ channelId }),
}));
