import { create } from "zustand";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { applyTax } from "../utils";

export interface InvoiceType {
  product: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}


type clientType = {
  username: string;
  fullname?: string;
  email?: string;
  phone?: string;
};

interface InvoiceStoreType {
  client: clientType;
  data: InvoiceType[];
  columns: any;
  setData: (data: InvoiceType[]) => void;
  addData: (data: InvoiceType) => void;
  setClient: (client: clientType | string) => void;
}

const columHelper = createColumnHelper<InvoiceType>();

export const useInvoicesStore = create<InvoiceStoreType>((set) => ({
  allProducts: [],
  client: "",
  data: [],
  columns: [
    columHelper.accessor("product", {
      cell: (props: any) => <div>{props.getValue()}</div>,
    }),
    columHelper.accessor("quantity", {
      cell: (props: any) => <div>{props.getValue()}</div>,
    }),
    columHelper.accessor("unitPrice", {
      cell: (props: any) => <div>{props.getValue()}</div>,
      footer: () => (
        <div className="footer">
          <p>subTotal</p>
          <p>Tax</p>
          <p>Total</p>
        </div>
      ),
    }),
    columHelper.accessor("totalPrice", {
      cell: (props: any) => <div>{props.getValue()}</div>,
      footer: (props) => (
        <div className="footer">
          <p>
            {props.table
              .getCoreRowModel()
              .rows.reduce(
                (total: any, row: any) => total + row.getValue("totalPrice"),
                0
              )}
          </p>
          <p>19%</p>
          <p>
            {applyTax(
              props.table
                .getCoreRowModel()
                .rows.reduce(
                  (total: any, row: any) => total + row.getValue("totalPrice"),
                  0
                ),
              19
            )}
          </p>
        </div>
      ),
    }),
  ],
  setData: (data: InvoiceType[]) => set({ data }),
  addData: (data: InvoiceType) =>
    set((state) => ({ data: [...state.data, data] })),
  setClient: (client: clientType | string) => set({ client }),
}));
