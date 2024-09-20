import { create } from "zustand";

interface IGlobalStore {
  isOutsideSearch: Boolean;
  openMobileSearch: Boolean;
  setIsOutsideSearch: (value: Boolean) => void;
  setMobileSearch: (value: Boolean) => void;
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
  isOutsideSearch: true,
  openMobileSearch: false,
  setMobileSearch: (value: Boolean) => set(() => ({ openMobileSearch: value })),
  setIsOutsideSearch: (value: Boolean) =>
    set(() => ({
      isOutsideSearch: value,
    })),
}));
