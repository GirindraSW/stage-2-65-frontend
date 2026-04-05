import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Todo } from "@/context/TodoContext";
import { useTodos } from "@/hooks/useTodos";

// menampilkan satu todo serta aksi update/toggle/delete.
export default function TodoItem({ todo }: { todo: Todo }) {
  const { updateTodo, toggleTodo, deleteTodo, updatingId, deletingId } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);

  const isUpdatingCurrentTodo = updatingId === todo.id;
  const isDeletingCurrentTodo = deletingId === todo.id;

  // Simpan edit title dengan controlled input.
  const handleSaveEdit = async () => {
    await updateTodo(todo.id, draftTitle);
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 size-4"
          checked={todo.completed}
          disabled={isUpdatingCurrentTodo || isDeletingCurrentTodo}
          onChange={() => toggleTodo(todo.id)}
        />

        <div className="min-w-0 space-y-2">
          {isEditing ? (
            <Input
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              disabled={isUpdatingCurrentTodo}
            />
          ) : (
            <p className={todo.completed ? "line-through text-muted-foreground" : "text-foreground"}>
              {todo.title}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {isEditing ? (
          <>
            <Button size="sm" disabled={isUpdatingCurrentTodo} onClick={handleSaveEdit}>
              {isUpdatingCurrentTodo ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={isUpdatingCurrentTodo}
              onClick={() => {
                setDraftTitle(todo.title);
                setIsEditing(false);
              }}
            >
              Batal
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="outline"
            disabled={isUpdatingCurrentTodo || isDeletingCurrentTodo}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}

        <Button
          size="sm"
          variant="destructive"
          disabled={isDeletingCurrentTodo || isUpdatingCurrentTodo}
          onClick={() => deleteTodo(todo.id)}
        >
          {isDeletingCurrentTodo ? "Menghapus..." : "Delete"}
        </Button>
      </div>
    </li>
  );
}
