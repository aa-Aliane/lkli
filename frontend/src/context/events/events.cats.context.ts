import { create } from "zustand";

export interface ICat {
  active?: boolean;
  name: string;
  id: number;
}
interface ICats {
  cats: ICat[];
  initCats: (cats: ICat[]) => void;
  setCatActive: (index: number, value: boolean) => void;
}

export const useCatsStore = create<ICats>((set) => ({
  cats: [],
  initCats: (cats: ICat[]) =>
    set({ cats: cats.map((cat: any) => ({ ...cat, active: false })) }),
  setCatActive: (index: number, value: boolean) =>
    set((state) => ({
      cats: state.cats.map((cat: any, i: number) =>
        i === index ? { ...cat, active: value } : cat
      ),
    })),
}));
