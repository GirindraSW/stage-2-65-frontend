import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ProductDetailType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  thumbnail: string;
};

const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// Halaman detail mengambil `productId` dari dynamic route lalu fetch detail produk per-id.
export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Effect ini menjalankan fetch detail produk berdasarkan parameter URL.
  useEffect(() => {
    if (!productId) {
      setError("Product ID tidak valid.");
      return;
    }

    const controller = new AbortController();

    const fetchProductDetail = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`https://dummyjson.com/products/${productId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Produk tidak ditemukan");
        }

        const data: ProductDetailType = await response.json();
        setProduct(data);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setError("Gagal memuat detail produk.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();

    return () => controller.abort();
  }, [productId]);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading detail produk...</p>;
  }

  if (error || !product) {
    return (
      <section className="space-y-4 rounded-xl border bg-card p-6">
        <h2 className="text-2xl font-semibold">Produk tidak ditemukan</h2>
        <p className="text-sm text-muted-foreground">{error || "Data produk tidak tersedia."}</p>
        <Button asChild variant="outline">
          <Link to="/products">Kembali ke Products</Link>
        </Button>
      </section>
    );
  }

  return (
    <article className="grid gap-6 rounded-xl border bg-card p-5 shadow-sm md:grid-cols-2 md:p-6">
      <div className="overflow-hidden rounded-lg">
        <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover" />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
          {product.category}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">{product.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        <p className="text-xl font-semibold">{priceFormatter.format(product.price * 16000)}</p>
        <p className="text-sm text-muted-foreground">Stok tersedia: {product.stock}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button>Tambah ke Cart</Button>
          <Button asChild variant="outline">
            <Link to="/products">Kembali</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
