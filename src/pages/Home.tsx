import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Halaman ini menjadi landing page Product Catalog dan mengarahkan user ke fitur utama.
export default function Home() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Katalog Produk</h2>
        <p className="max-w-3xl text-sm text-muted-foreground md:text-base">Cari produk dan lihat detailnya.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/products">Lihat Produk</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/dashboard">Buka Dashboard</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Produk Online</CardTitle>
            <CardDescription>Daftar produk diambil dari API.</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">Data tampil otomatis saat halaman dibuka.</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Sesi login disimpan di browser.</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">Tidak perlu login ulang setiap pindah halaman.</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Halaman ini hanya bisa diakses setelah login.</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">Kalau belum login, kamu akan diarahkan ke halaman login.</CardContent>
        </Card>
      </div>
    </section>
  );
}
