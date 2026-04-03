import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="space-y-4">
      <p className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
        React Router + Tailwind + ShadCN
      </p>
      <h2 className="text-3xl font-semibold tracking-tight">Home Page</h2>
      <p className="max-w-2xl text-sm text-slate-600">
        Ini halaman utama untuk checkpoint Multi-Page Blog. Gunakan menu di atas untuk
        berpindah antar halaman, lalu buka menu posts untuk mencoba nested route dan dynamic
        route.
      </p>
      <Button asChild>
        <Link to="/posts">Lihat Semua Post</Link>
      </Button>
    </section>
  );
}
