import { Outlet } from "react-router-dom";

export default function Posts() {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Posts</h2>
        <p className="text-sm text-slate-600">
          Ini parent route untuk halaman posts. Komponen child akan tampil melalui
          <code className="mx-1 rounded bg-slate-100 px-1 py-0.5">Outlet</code>.
        </p>
      </div>

      <Outlet />
    </section>
  );
}
