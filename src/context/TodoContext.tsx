import { createContext } from "react";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoContextType = {
  todos: Todo[];
  isCreating: boolean;
  updatingId: number | null;
  deletingId: number | null;
  createTodo: (title: string) => Promise<void>;
  updateTodo: (id: number, title: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
};

// Context ini menyimpan global state To-Do agar bisa dipakai lintas komponen tanpa props drilling.
export const TodoContext = createContext<TodoContextType | null>(null);
