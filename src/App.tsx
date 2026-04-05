import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { AuthProvider } from "@/context/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import PrivateRoute from "@/lib/privateRoute";
import Favorites from "@/pages/Favorites";
import Login from "@/pages/login";
import Movies from "@/pages/Movies";
import NotFound from "@/pages/NotFound";

// Header berisi navigasi utama, indikator jumlah favorit, serta tombol login/logout.
function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { favoriteCount } = useFavorites();

  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-6">
        <h1 className="text-lg font-semibold">Movie List</h1>

        <nav className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <NavLink to="/">Movies</NavLink>
          </Button>
          <Button asChild variant="outline" size="sm">
            <NavLink to="/favorites">Favorites ({favoriteCount})</NavLink>
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

// Layout ini memuat route utama Movie List.
function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

// App membungkus routing dengan AuthProvider agar status login bisa dipakai lintas halaman.
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}
