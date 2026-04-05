import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

// Dashboard adalah halaman private, hanya tampil jika user sudah login.
export default function Dashboard() {
  const { token } = useAuth();

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
      <p className="text-sm text-muted-foreground">Kamu sudah login.</p>

      <div className="rounded-xl border bg-card p-4">
        <p className="text-xs text-muted-foreground">Token Aktif</p>
        <code className="text-sm font-medium">{token}</code>
      </div>

      <Button asChild variant="outline">
        <Link to="/products">Lihat Produk</Link>
      </Button>
    </section>
  );
}
