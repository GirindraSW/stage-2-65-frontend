export type Product = {
  id: number;
  title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  thumbnail: string;
};

type ProductsResponse = {
  products: Product[];
};

const BASE_URL = "https://dummyjson.com";

export const searchProducts = async (
  query: string,
  signal?: AbortSignal
): Promise<Product[]> => {
  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data produk.");
  }

  const data: ProductsResponse = await response.json();
  return data.products;
};