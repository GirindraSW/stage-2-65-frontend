import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodos } from "@/hooks/useTodos";

// Form todo baru.
export default function TodoForm() {
  const [title, setTitle] = useState("");
  const { createTodo, isCreating } = useTodos();

  // memanggil fungsi global di context lalu reset input.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    await createTodo(title);
    setTitle("");
  };

  return (
    <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Contoh: Belajar useContext"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Button type="submit" disabled={isCreating}>
        {isCreating ? "Menyimpan..." : "Tambah"}
      </Button>
    </form>
  );
}
