import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import type { CartItem, Product } from "@/types/cart";

const API_BASE_URL = "http://localhost:5000/api";

// Provider ini memegang data produk, data cart, dan operasi CRUD cart secara global.
export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [initialError, setInitialError] = useState("");
  const [addingProductId, setAddingProductId] = useState<number | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);

  // Saat pertama load, kita ambil data produk dan cart sekaligus.
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoadingInitial(true);
        setInitialError("");

        const [productsResponse, cartResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/products`),
          fetch(`${API_BASE_URL}/cart`),
        ]);

        if (!productsResponse.ok || !cartResponse.ok) {
          throw new Error("Gagal mengambil data awal");
        }

        const nextProducts: Product[] = await productsResponse.json();
        const nextCartItems: CartItem[] = await cartResponse.json();

        setProducts(nextProducts);
        setCartItems(nextCartItems);
      } catch {
        setInitialError(
          "Gagal mengambil data awal. Pastikan backend Express berjalan di http://localhost:5000."
        );
      } finally {
        setIsLoadingInitial(false);
      }
    };

    fetchInitialData();
  }, []);

  // Add ke cart dengan loading state per produk.
  const addToCart = async (productId: number) => {
    setAddingProductId(productId);

    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Gagal add to cart");
      }

      const nextCartItem: CartItem = await response.json();

      setCartItems((previousItems) => {
        const exists = previousItems.some((item) => item.id === nextCartItem.id);
        if (exists) {
          return previousItems.map((item) => (item.id === nextCartItem.id ? nextCartItem : item));
        }
        return [nextCartItem, ...previousItems];
      });
    } finally {
      setAddingProductId(null);
    }
  };

  // Update qty menggunakan optimistic update: UI langsung berubah, lalu sinkron ke server.
  const updateQuantity = async (cartItemId: number, quantity: number) => {
    const previousItems = cartItems;

    setUpdatingItemId(cartItemId);
    setCartItems((items) =>
      items.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );

    try {
      const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error("Gagal update quantity");
      }

      const syncedItem: CartItem = await response.json();
      setCartItems((items) => items.map((item) => (item.id === cartItemId ? syncedItem : item)));
    } catch {
      // Jika API gagal, kembalikan UI ke state sebelumnya.
      setCartItems(previousItems);
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Remove item dari cart.
  const removeFromCart = async (cartItemId: number) => {
    setRemovingItemId(cartItemId);

    try {
      await fetch(`${API_BASE_URL}/cart/${cartItemId}`, { method: "DELETE" });
      setCartItems((items) => items.filter((item) => item.id !== cartItemId));
    } finally {
      setRemovingItemId(null);
    }
  };

  const contextValue = useMemo(
    () => ({
      products,
      cartItems,
      isLoadingInitial,
      initialError,
      addingProductId,
      updatingItemId,
      removingItemId,
      addToCart,
      updateQuantity,
      removeFromCart,
    }),
    [
      products,
      cartItems,
      isLoadingInitial,
      initialError,
      addingProductId,
      updatingItemId,
      removingItemId,
    ]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
