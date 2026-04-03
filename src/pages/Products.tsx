import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/data/products";

const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function Products() {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Products</h2>
        <p className="text-sm text-slate-600">Pilih produk dan buka detail untuk melihat informasi lebih lengkap.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden p-0">
            <div className="aspect-video w-full overflow-hidden">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>

            <div className="p-5">
              <CardHeader className="p-0">
                <CardDescription>{product.category}</CardDescription>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>

              <CardContent className="p-0 pt-3 text-slate-600">{product.description}</CardContent>

              <CardFooter className="p-0 pt-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{priceFormatter.format(product.price)}</p>
                  <p className="text-xs text-slate-500">Stok: {product.stock}</p>
                </div>
                <Button asChild size="sm">
                  <Link to={`/products/${product.id}`}>Lihat Detail</Link>
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
