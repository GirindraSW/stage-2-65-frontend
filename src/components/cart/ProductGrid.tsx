import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// Menampilkan daftar produk dan aksi Add to Cart.
export default function ProductGrid() {
  const { products, addingProductId } = useCart();
  const { addToCart } = useCart();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden p-0">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>

            <div className="p-4">
              <CardHeader className="p-0">
                <CardTitle className="text-base">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-sm text-muted-foreground">
                Stok: {product.stock}
              </CardContent>
              <CardFooter className="p-0 pt-4">
                <p className="text-sm font-semibold">{currencyFormatter.format(product.price)}</p>
                <Button
                  size="sm"
                  disabled={addingProductId === product.id}
                  onClick={() => addToCart(product.id)}
                >
                  {addingProductId === product.id ? "Adding..." : "Add to Cart"}
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
