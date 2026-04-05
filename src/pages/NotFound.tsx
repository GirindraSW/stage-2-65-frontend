import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Halaman fallback untuk route yang tidak ditemukan.
export default function NotFound() {
  return (
    <section className="space-y-4 rounded-xl border bg-card p-6">
      <h2 className="text-2xl font-semibold">404 - Halaman tidak ditemukan</h2>
      <p className="text-sm text-muted-foreground">URL tidak tersedia di Movie List.</p>
      <Button asChild variant="outline">
        <Link to="/">Kembali ke Movies</Link>
      </Button>
    </section>
  );
}
