import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFavorites } from "@/hooks/useFavorites";
import type { Movie } from "@/types/movie";

type RawMovie = {
  id?: number;
  title?: string;
  posterURL?: string;
  imdbRating?: string | number;
  year?: string | number;
  plot?: string;
};

const FALLBACK_POSTER = "https://placehold.co/600x340?text=No+Poster";

// mengubah format data API mentah menjadi struktur Movie yang dipakai aplikasi.
function normalizeMovie(rawMovie: RawMovie, index: number): Movie {
  return {
    id: rawMovie.id ?? index + 1,
    title: rawMovie.title ?? "Untitled Movie",
    year: String(rawMovie.year ?? "-") ,
    rating: rawMovie.imdbRating ? Number(rawMovie.imdbRating) : null,
    poster: rawMovie.posterURL || FALLBACK_POSTER,
    overview: rawMovie.plot || "Deskripsi film belum tersedia.",
  };
}

// halaman Movies mengambil data film dari fake API lalu menampilkannya dalam grid card.
export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  // fetch daftar film.
  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch("https://api.sampleapis.com/movies/animation", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data movie.");
        }

        const rawMovies: RawMovie[] = await response.json();
        setMovies(rawMovies.slice(0, 18).map(normalizeMovie));
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setErrorMessage("Movie tidak bisa dimuat. Coba refresh lagi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, []);

  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Movie List</h2>
        <p className="text-sm text-muted-foreground">Pilih film lalu simpan ke favorites.</p>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading movie...</p>}
      {!isLoading && errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      )}

      {!isLoading && !errorMessage && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {movies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden p-0">
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
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
                  <Button
                    size="sm"
                    variant={isFavorite(movie.id) ? "secondary" : "default"}
                    onClick={() => toggleFavorite(movie)}
                  >
                    {isFavorite(movie.id) ? "Remove" : "Add"}
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
