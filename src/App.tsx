import CartPanel from "@/components/cart/CartPanel";
import ProductGrid from "@/components/cart/ProductGrid";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { CartProvider } from "@/context/CartProvider";
import { useCart } from "@/hooks/useCart";

// Layout halaman cart management dengan dua area: produk dan cart.
function CartManagementLayout() {
  const { isLoadingInitial, initialError } = useCart();

  if (isLoadingInitial) {
    return (
      <div className="grid min-h-screen place-items-center bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
        <p className="text-sm text-muted-foreground">Memuat data cart...</p>
      </div>
    );
  }

  if (initialError) {
    return (
      <div className="grid min-h-screen place-items-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
        <p className="max-w-xl text-center text-sm text-destructive">{initialError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-8 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <header className="flex items-center justify-between rounded-xl border bg-card px-4 py-3 shadow-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Checkpoint 2
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Cart Management App</h1>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <ProductGrid />
          <CartPanel />
        </div>
      </div>
    </div>
  );
}

// App dibungkus CartProvider agar state cart bisa dipakai global oleh semua komponen.
export default function App() {
  return (
    <CartProvider>
      <CartManagementLayout />
    </CartProvider>
  );
}
