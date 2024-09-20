export const applyTax = (subtotal: number, tax: number) =>
  subtotal + (subtotal * tax) / 100;
