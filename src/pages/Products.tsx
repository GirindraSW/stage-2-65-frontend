import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  thumbnail: string;
};

type ProductsResponse = {
  products: Product[];
};

const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// mengambil data produk dari API lalu menampilkannya dalam grid card.
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch API saat komponen pertama kali dirender.
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("https://dummyjson.com/products?limit=12", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data produk");
        }

        const data: ProductsResponse = await response.json();
        setProducts(data.products);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setError("Gagal memuat produk. Coba refresh halaman.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Products</h2>
        <p className="text-sm text-muted-foreground">Pilih produk yang ingin kamu lihat.</p>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading produk...</p>}
      {!isLoading && error && <p className="text-sm font-medium text-destructive">{error}</p>}

      {!isLoading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden p-0">
              <div className="aspect-video w-full overflow-hidden">
                <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover" />
              </div>

              <div className="p-5">
                <CardHeader className="p-0">
                  <CardDescription className="capitalize">{product.category}</CardDescription>
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>

                <CardContent className="p-0 pt-3 text-muted-foreground">{product.description}</CardContent>

                <CardFooter className="p-0 pt-4">
                  <div>
                    <p className="text-sm font-semibold">{priceFormatter.format(product.price * 16000)}</p>
                    <p className="text-xs text-muted-foreground">Stok: {product.stock}</p>
                  </div>
                  <Button asChild size="sm">
                    <Link to={`/products/${product.id}`}>Lihat Detail</Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
