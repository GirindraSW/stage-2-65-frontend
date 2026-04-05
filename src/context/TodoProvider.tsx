import { useState } from "react";
import type { ReactNode } from "react";
import { TodoContext, type Todo } from "./TodoContext";

const INITIAL_TODOS: Todo[] = [
  { id: 1, title: "Belajar Context API", completed: true },
  { id: 2, title: "Buat fitur create todo", completed: false },
  { id: 3, title: "Tambahkan loading per operasi", completed: false },
];

// loading state
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// state todo global, CRUD.
export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  const [isCreating, setIsCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Create: Optimistic
  const createTodo = async (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    setIsCreating(true);

    const optimisticTodo: Todo = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    };

    setTodos((previousTodos) => [optimisticTodo, ...previousTodos]);

    await wait(500);
    setIsCreating(false);
  };

  // Update judul: perubahan langsung tampil agar UI terasa responsif.
  const updateTodo = async (id: number, title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    setUpdatingId(id);

    setTodos((previousTodos) =>
      previousTodos.map((todo) => (todo.id === id ? { ...todo, title: trimmedTitle } : todo))
    );

    await wait(400);
    setUpdatingId(null);
  };

  // Toggle status: centang/uncentang todo langsung berubah tanpa menunggu response.
  const toggleTodo = async (id: number) => {
    setUpdatingId(id);

    setTodos((previousTodos) =>
      previousTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );

    await wait(250);
    setUpdatingId(null);
  };

  // optimistic dellete
  const deleteTodo = async (id: number) => {
    setDeletingId(id);

    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));

    await wait(400);
    setDeletingId(null);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        isCreating,
        updatingId,
        deletingId,
        createTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
