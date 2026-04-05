// Halaman ini menjelaskan tujuan project dan teknologi yang digunakan.
export default function About() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight">About Product Catalog</h2>
      <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
        Project ini latihan route, login sederhana, dan tampilan katalog produk.
      </p>
      <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
        Dibuat dengan React, TypeScript, Tailwind, dan ShadCN.
      </div>
    </section>
  );
}
