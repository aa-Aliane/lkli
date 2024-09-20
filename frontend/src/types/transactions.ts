export interface Iproduct {
  id?: number;
  name: string;
  price: number;
  description?: string;
  reduction?: number;
}

export interface Ipurchase {
  id?: number;
  product: string;
  quantity: number;
  unitPrice: number;
}
