export default function About() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight">About Page</h2>
      <p className="max-w-2xl text-sm text-slate-600">
        Halaman ini dibuat untuk memenuhi basic routing pada checkpoint. Styling memakai
        utility classes Tailwind agar cepat dan konsisten.
      </p>
      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-slate-700">
          Fokus checkpoint 1:
          basic route, nested route, dynamic route, dan penggunaan komponen ShadCN.
        </p>
      </div>
    </section>
  );
}