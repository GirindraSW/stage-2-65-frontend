import { useMemo, useState } from "react";
import type { Movie } from "@/types/movie";

const FAVORITES_KEY = "favorite_movies";

// membaca data favorit dari localStorage
function getInitialFavorites(): Movie[] {
  const rawFavorites = localStorage.getItem(FAVORITES_KEY);

  if (!rawFavorites) {
    return [];
  }

  try {
    return JSON.parse(rawFavorites) as Movie[];
  } catch {
    return [];
  }
}

// mengelola daftar movie favorit dan menyimpannya ke localStorage.
export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>(getInitialFavorites);

  // mengecek apakah movie sudah masuk favorit.
  const isFavorite = (movieId: number) => favorites.some((movie) => movie.id === movieId);

  // menambah atau menghapus movie dari daftar favorit.
  const toggleFavorite = (movie: Movie) => {
    setFavorites((previousFavorites) => {
      const nextFavorites = previousFavorites.some((item) => item.id === movie.id)
        ? previousFavorites.filter((item) => item.id !== movie.id)
        : [...previousFavorites, movie];

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
      return nextFavorites;
    });
  };

  const favoriteCount = useMemo(() => favorites.length, [favorites]);

  return {
    favorites,
    favoriteCount,
    isFavorite,
    toggleFavorite,
  };
}
