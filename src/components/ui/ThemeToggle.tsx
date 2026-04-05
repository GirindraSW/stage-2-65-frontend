import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

// Fungsi ini menentukan tema awal berdasarkan localStorage atau preferensi sistem.
function getInitialTheme(): boolean {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    return true;
  }

  if (savedTheme === "light") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Tombol ini mengubah mode terang/gelap dengan menambah atau menghapus class `dark` di root html.
export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialTheme);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      return;
    }

    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, [darkMode]);

  return (
    <Button variant="outline" size="icon" onClick={() => setDarkMode((prev) => !prev)}>
      {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
