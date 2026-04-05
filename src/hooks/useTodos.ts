import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext";

// Hook ini memudahkan akses TodoContext sekaligus menjaga agar dipakai di dalam provider.
export function useTodos() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodos must be used within TodoProvider");
  }

  return context;
}
