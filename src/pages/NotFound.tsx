import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="space-y-4 rounded-xl border bg-white p-6">
      <h2 className="text-2xl font-semibold">404 - Halaman tidak ditemukan</h2>
      <p className="text-sm text-slate-600">URL yang kamu buka belum terdaftar pada routing aplikasi.</p>
      <Button asChild variant="outline">
        <Link to="/">Kembali ke Home</Link>
      </Button>
    </section>
  );
}
