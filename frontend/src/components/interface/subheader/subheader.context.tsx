import { create } from "zustand";

// Define the interface for the store
interface ISubheaderStore {
  menuToggle: boolean;
  isOutsideMenu: boolean;
  currentMenuItem: number;
  filtersToggle: boolean;
  setFiltersToggle: (value: boolean) => void;
  isOutsideFilters: boolean;
  setIsOutsideFilters: (value: boolean) => void;
  setIsOutsideMenu: (value: boolean) => void;
  setMenuToggle: (value: boolean) => void;
  setCurrentMenuItem: (value: number) => void;
}

// Create the Zustand store
export const useSubheaderStore = create<ISubheaderStore>((set) => ({
  // Initial state
  menuToggle: false,
  isOutsideMenu: true,
  currentMenuItem: 0,
  filtersToggle: false,
  isOutsideFilters: true,

  // Setter functions
  setMenuToggle: (value: boolean) => set({ menuToggle: value }),
  setIsOutsideMenu: (value: boolean) => set({ isOutsideMenu: value }),
  setCurrentMenuItem: (value: number) => set({ currentMenuItem: value }),
  setFiltersToggle: (value: boolean) => set({ filtersToggle: value }),
  setIsOutsideFilters: (value: boolean) => set({ isOutsideFilters: value }),
}));
