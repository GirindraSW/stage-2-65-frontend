import { useEffect, useState } from "react";
import { searchProducts } from "./api/productApi";
import type { Product } from "./api/productApi";
import ProductCard from "./components/ProductCard";
import "./App.css";

const DEBOUNCE_DELAY = 1000;
const IDR_RATE = 16000;

function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch) {
      setProducts([]);
      setError("");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError("");

        const nextProducts = await searchProducts(debouncedSearch, controller.signal);
        setProducts(nextProducts);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setProducts([]);
        setError("API tidak bisa diakses. Coba cek koneksi internet kamu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [debouncedSearch]);

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <p className="app__eyebrow">Checkpoint 2 - Search Product</p>
          <h1>Search Product</h1>
          <p className="app__sub">
            Cari produk dengan controlled input. Request API akan dijalankan setelah jeda
            singkat agar tidak memanggil API terlalu sering.
          </p>
        </div>
      </header>

      <main className="app__main">
        <section className="search-box">
          <label htmlFor="search-product" className="search-box__label">
            Nama Produk
          </label>
          <input
            id="search-product"
            type="text"
            className="search-box__input"
            placeholder="Ketik nama produk..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </section>

        {isLoading && <p className="app__status">Loading produk...</p>}
        {!isLoading && error && <p className="app__status app__status--error">{error}</p>}
        {!isLoading && !error && debouncedSearch && products.length === 0 && (
          <p className="app__status">Produk tidak ditemukan.</p>
        )}
        {!isLoading && !error && !debouncedSearch && (
          <p className="app__status">Mulai dengan mengetik kata kunci produk.</p>
        )}

        {!isLoading && !error && products.length > 0 && (
          <section className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                brand={product.brand}
                category={product.category}
                description={product.description}
                price={product.price * IDR_RATE}
                image={product.thumbnail}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
