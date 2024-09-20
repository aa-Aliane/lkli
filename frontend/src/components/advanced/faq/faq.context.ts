import { create } from "zustand";

interface IStore {
  itemsState: Boolean[];
  toggle: any;
  initItemsState: (len: number) => void;
  setItemsState: (itemsState: Boolean[]) => void;
}

export const useFaqStore = create<IStore>((set) => ({
  itemsState: [],
  toggle: { true: "arrow_drop_up", false: "arrow_drop_down" },
  initItemsState: (len: number) => set({ itemsState: Array(len).fill(false) }),
  setItemsState: (itemsState: Boolean[]) => set({ itemsState }),
  setToggle: (toggle: "arrow_drop_down" | "arrow_drop_up") => set({ toggle }),
}));
