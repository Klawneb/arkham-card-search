import { create } from "zustand/react";

interface SettingsState {
  cardSize: number;
  setCardSize: (size: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  cardSize: 50,
  setCardSize: (size) => set({ cardSize: size }),
}));
