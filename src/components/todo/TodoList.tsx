import TodoItem from "@/components/todo/TodoItem";
import { useTodos } from "@/hooks/useTodos";

// menampilkan daftar todo (read operation) dari global state.
export default function TodoList() {
  const { todos } = useTodos();

  if (todos.length === 0) {
    return <p className="text-sm text-muted-foreground">Belum ada todo. Tambahkan dulu.</p>;
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
