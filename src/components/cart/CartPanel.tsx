import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// Menampilkan isi cart + update qty + remove item.
export default function CartPanel() {
  const { cartItems, updatingItemId, removingItemId, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (totalPrice, cartItem) => totalPrice + cartItem.product.price * cartItem.quantity,
    0
  );

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Cart</h2>

      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {cartItems.length === 0 && (
            <p className="text-sm text-muted-foreground">Cart masih kosong.</p>
          )}

          {cartItems.map((cartItem) => (
            <div
              key={cartItem.id}
              className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{cartItem.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {currencyFormatter.format(cartItem.product.price)} x {cartItem.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={cartItem.quantity <= 1 || updatingItemId === cartItem.id}
                  onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                >
                  -
                </Button>

                <span className="min-w-8 text-center text-sm font-medium">{cartItem.quantity}</span>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={updatingItemId === cartItem.id}
                  onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                >
                  +
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  disabled={removingItemId === cartItem.id}
                  onClick={() => removeFromCart(cartItem.id)}
                >
                  {removingItemId === cartItem.id ? "Removing..." : "Remove"}
                </Button>
              </div>
            </div>
          ))}

          <div className="rounded-lg border bg-muted/40 p-3">
            <p className="text-sm text-muted-foreground">Subtotal</p>
            <p className="text-xl font-semibold">{currencyFormatter.format(subtotal)}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
