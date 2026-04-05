export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
};

export type CartItem = {
  id: number;
  quantity: number;
  productId: number;
  product: Product;
};
