import { createContext } from "react";
import type { CartItem, Product } from "@/types/cart";

export type CartContextType = {
  products: Product[];
  cartItems: CartItem[];
  isLoadingInitial: boolean;
  initialError: string;
  addingProductId: number | null;
  updatingItemId: number | null;
  removingItemId: number | null;
  addToCart: (productId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
};

// Context ini menampung global state Cart agar bisa dipakai lintas komponen.
export const CartContext = createContext<CartContextType | null>(null);
