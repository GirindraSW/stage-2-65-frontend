import { useMemo, useState } from "react"; //use memo optimasi dengen menyimpan perhitungan di antara rendering
import ProductCard from "./components/ProductCard";
import "./App.css";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  inCart: boolean;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Minimal Desk Lamp",
    price: 225000,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop",
    inCart: false,
  },
  {
    id: 2,
    name: "Soft Woven Chair",
    price: 1250000,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
    inCart: false,
  },
  {
    id: 3,
    name: "Warm Ceramic Mug",
    price: 79000,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
    inCart: false,
  },
  {
    id: 4,
    name: "Textured Throw Blanket",
    price: 349000,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop",
    inCart: false,
  },
];

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const toggleCart = (id: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, inCart: !product.inCart }
          : product
      )
    );
  };
  {/* 
    Fungsi toggleCart untuk menambah atau menghapus produk dari keranjang. 
    Parameter id adalah id produk yang diklik.
    Dalam setProducts, menggunakan prev state products lalu memetakan tiap produk.
    Jika id cocok dengan produk, buat copy produk tersebut tapi invert nilai inCart.
    Produk lain tetap sama. 
  */}

  const cartCount = useMemo(
    () => products.filter((product) => product.inCart).length,
    [products]
  );
  {/* 
    Menghitung jumlah produk yang ada di keranjang menggunakan useMemo agar hanya dihitung ulang 
    ketika products berubah. Filter produk yang inCart true, lalu hitung panjang arraynya. 
  */}

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <p className="app__eyebrow">Checkpoint 2 � Product List</p>
          <h1>Studio Essentials</h1>
          <p className="app__sub">
            Toggle produk untuk menambahkannya ke cart. Tombol akan berubah saat
            sudah ditambahkan.
          </p>
        </div>
        <div className="cart-badge">
          <span className="cart-badge__label">Cart</span>
          <span className="cart-badge__count">{cartCount}</span>
        </div>
      </header>

      <main className="app__main">
        <section className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              inCart={product.inCart}
              onToggle={() => toggleCart(product.id)}
            />
          ))}
        </section>
      </main>
       {/* 
        Bagian main yang menampilkan daftar produk sebagai grid.
        Untuk tiap produk dipetakan ke komponen ProductCard dengan props data produk,
        dan fungsi toggleCart dipasangkan pada onToggle.
      */}
    </div>
  );
}

export default App;
