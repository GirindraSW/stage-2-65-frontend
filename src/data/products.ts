export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "wireless-headphone-x7",
    name: "Wireless Headphone X7",
    category: "Audio",
    description: "Headphone bluetooth dengan active noise cancellation dan baterai tahan lama.",
    price: 899000,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "smart-watch-nova",
    name: "Smart Watch Nova",
    category: "Wearable",
    description: "Pantau aktivitas harian, detak jantung, dan notifikasi langsung dari pergelangan tangan.",
    price: 1250000,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "mechanical-keyboard-k2",
    name: "Mechanical Keyboard K2",
    category: "Accessories",
    description: "Keyboard mechanical tactile dengan layout compact dan backlight RGB.",
    price: 1099000,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "portable-ssd-1tb",
    name: "Portable SSD 1TB",
    category: "Storage",
    description: "Transfer data super cepat untuk kerja kreatif, backup, dan kebutuhan mobile.",
    price: 1499000,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1591799265444-d66432b91588?q=80&w=1000&auto=format&fit=crop",
  },
];
