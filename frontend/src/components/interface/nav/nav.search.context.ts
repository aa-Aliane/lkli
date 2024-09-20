import { create } from "zustand";

interface ISearchLocationContext {
  locationFilter: string[];
  setLocationFilter: (locations: string[]) => void;
}

export const useSearchLocationContext = create<ISearchLocationContext>(
  (set) => ({
    locationFilter: [],
    setLocationFilter: (locations: string[]) =>
      set({ locationFilter: locations }),
  })
);
