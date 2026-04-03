import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import { Button } from "./components/ui/button";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b bg-white">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-6">
            <h1 className="text-lg font-semibold">Checkpoint 2 - E-Commerce Store</h1>
            <nav className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <NavLink to="/">Home</NavLink>
              </Button>
              <Button asChild variant="outline" size="sm">
                <NavLink to="/products">Products</NavLink>
              </Button>
              <Button asChild variant="outline" size="sm">
                <NavLink to="/cart">Cart</NavLink>
              </Button>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            {/* Dynamic route product detail: nilai `:productId` dipakai untuk buka detail produk */}
            <Route path="/products/:productId" element={<ProductDetail />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
