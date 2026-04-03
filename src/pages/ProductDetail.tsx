import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function ProductDetail() {
  // Dynamic route product detail: `productId` diambil dari URL `/products/:productId`
  const { productId } = useParams<{ productId: string }>();

  const selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) {
    return (
      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-2xl font-semibold">Produk tidak ditemukan</h2>
        <p className="text-sm text-slate-600">
          Product ID pada URL tidak cocok dengan data produk yang tersedia.
        </p>
        <Button asChild variant="outline">
          <Link to="/products">Kembali ke Products</Link>
        </Button>
      </section>
    );
  }

  return (
    <article className="grid gap-6 rounded-xl border bg-white p-5 md:grid-cols-2 md:p-6">
      <div className="overflow-hidden rounded-lg">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          {selectedProduct.category}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">{selectedProduct.name}</h2>
        <p className="text-sm leading-relaxed text-slate-600">{selectedProduct.description}</p>
        <p className="text-xl font-semibold text-slate-900">
          {priceFormatter.format(selectedProduct.price)}
        </p>
        <p className="text-sm text-slate-500">Stok tersedia: {selectedProduct.stock}</p>

        <div className="flex gap-2 pt-2">
          <Button>Tambah ke Cart</Button>
          <Button asChild variant="outline">
            <Link to="/products">Kembali</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
