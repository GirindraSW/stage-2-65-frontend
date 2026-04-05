import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFavorites } from "@/hooks/useFavorites";

// private favorit
export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section className="space-y-4 rounded-xl border bg-card p-6">
        <h2 className="text-2xl font-semibold">Favorites</h2>
        <p className="text-sm text-muted-foreground">Belum ada movie favorit.</p>
        <Button asChild variant="outline">
          <Link to="/">Kembali ke Movie List</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-semibold tracking-tight">Favorites</h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {favorites.map((movie) => (
          <Card key={movie.id} className="overflow-hidden p-0">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover" />
            </div>

            <div className="p-5">
              <CardHeader className="p-0">
                <CardDescription>Tahun {movie.year}</CardDescription>
                <CardTitle>{movie.title}</CardTitle>
              </CardHeader>

              <CardContent className="p-0 pt-3 text-muted-foreground">
                <p className="line-clamp-3">{movie.overview}</p>
              </CardContent>

              <CardFooter className="p-0 pt-4">
                <p className="text-sm font-medium">Rating: {movie.rating ?? "-"}</p>
                <Button size="sm" variant="secondary" onClick={() => toggleFavorite(movie)}>
                  Remove
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
