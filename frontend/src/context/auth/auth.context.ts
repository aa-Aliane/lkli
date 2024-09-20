import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type accountIdType = number | null;

interface IAuthType {
  accountId: accountIdType;
  setAccountId: (accountId: accountIdType) => void;
}
export const useAuthStore = create<IAuthType>()(
  devtools(
    persist(
      (set) => ({
        accountId: null,
        setAccountId: (accountId: accountIdType) => set({ accountId }),
      }),
      { name: "authStore" }
    )
  )
);
