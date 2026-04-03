import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="space-y-5">
      <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
        Checkpoint 2 - E-Commerce Store
      </p>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
        Temukan Produk Favoritmu
      </h2>
      <p className="max-w-2xl text-sm text-slate-600 md:text-base">
        Project ini menggunakan React Router untuk halaman Home, Products, Cart, dan Product
        Detail. Tampilan dibangun dengan Tailwind dan komponen ShadCN UI.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/products">Belanja Sekarang</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/cart">Lihat Cart</Link>
        </Button>
      </div>
    </section>
  );
}
