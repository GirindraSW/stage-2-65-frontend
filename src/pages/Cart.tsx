import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
};

const cartItems: CartItem[] = [
  { id: "wireless-headphone-x7", name: "Wireless Headphone X7", category: "Audio", price: 899000, qty: 1 },
  { id: "smart-watch-nova", name: "Smart Watch Nova", category: "Wearable", price: 1250000, qty: 1 },
  { id: "mechanical-keyboard-k2", name: "Mechanical Keyboard K2", category: "Accessories", price: 1099000, qty: 2 },
  { id: "portable-ssd-1tb", name: "Portable SSD 1TB", category: "Storage", price: 1499000, qty: 1 },
];

const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// Halaman cart menampilkan item keranjang hardcoded dan menghitung total belanja.
export default function Cart() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-semibold tracking-tight">Cart</h2>

      <div className="space-y-3">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border bg-card px-4 py-3">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.category} · Qty: {item.qty}
              </p>
            </div>
            <p className="text-sm font-semibold">{priceFormatter.format(item.price * item.qty)}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">Total belanja</p>
        <p className="text-2xl font-semibold">{priceFormatter.format(total)}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button>Checkout</Button>
        <Button asChild variant="outline">
          <Link to="/products">Tambah Produk Lain</Link>
        </Button>
      </div>
    </section>
  );
}
