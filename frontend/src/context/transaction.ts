import { create } from "zustand";
import { PurchaseType } from "../components/dashboard/s-operation.types";

interface transactionType {
  fieldsState: any;
  existingProducts: any;
  selectedProductIndex: number;
  pendingProducts: PurchaseType[];
  setFieldsState: (fieldsState: any) => void;
  setExistingProducts: (existingProducts: any) => void;
  setSelectedProductIndex: (selectedProductIndex: number) => void;
  setPendingProducts: (pendingProducts: PurchaseType[]) => void;
}
export const useTransactionStore = create<transactionType>((set) => ({
  fieldsState: [],
  existingProducts: [],
  selectedProductIndex: 0,
  pendingProducts: [],
  setFieldsState: (fieldsState: any) => set({ fieldsState }),
  setExistingProducts: (existingProducts: any) => set({ existingProducts }),
  setSelectedProductIndex: (selectedProductIndex: number) =>
    set({ selectedProductIndex }),
  setPendingProducts: (pendingProducts: PurchaseType[]) =>
    set({ pendingProducts }),
}));
