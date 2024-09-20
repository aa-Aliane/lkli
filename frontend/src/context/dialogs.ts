import { create } from "zustand";

interface DialogType {
  context?: any;
  dialogType: string;
  active: boolean;
  setContext: (context: any) => void;
  setDialogType: (dialogType: string) => void;
  setActive: (active: boolean) => void;
}
export const useDialogStore = create<DialogType>((set) => ({
  context: {},
  dialogType: "global",
  active: false,
  setContext: (context: any) => set({ context }),
  setDialogType: (dialogType: string) => set({ dialogType }),
  setActive: (active: boolean) => set({ active }),
}));
