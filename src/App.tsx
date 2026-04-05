import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { AuthProvider } from "@/context/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import PrivateRoute from "@/lib/privateRoute";
import About from "@/pages/About";
import Cart from "@/pages/Cart";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/login";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/ProductDetail";
import Products from "@/pages/Products";

// navigasi global, tombol login/logout, toggle tema.
function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-6">
        <h1 className="text-lg font-semibold">Product Catalog App</h1>

        <nav className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <NavLink to="/">Home</NavLink>
          </Button>
          <Button asChild variant="outline" size="sm">
            <NavLink to="/products">Products</NavLink>
          </Button>
          <Button asChild variant="outline" size="sm">
            <NavLink to="/cart">Cart</NavLink>
          </Button>
          <Button asChild variant="outline" size="sm">
            <NavLink to="/about">About</NavLink>
          </Button>
          <Button asChild variant="outline" size="sm">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button onClick={logout} variant="destructive" size="sm">
              Logout
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

// main route and active route
function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          {/* Dynamic route: param `productId` digunakan untuk menentukan detail produk yang ditampilkan */}
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

// AuthProvider + BrowserRouter
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}
