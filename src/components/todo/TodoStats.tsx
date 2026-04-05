import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTodos } from "@/hooks/useTodos";

// membaca state global untuk menampilkan ringkasan jumlah todo.
export default function TodoStats() {
  const { todos } = useTodos();

  const { totalTodos, completedTodos, activeTodos } = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;

    return {
      totalTodos: total,
      completedTodos: completed,
      activeTodos: total - completed,
    };
  }, [todos]);

  return (
    <Card>
      <CardContent className="grid grid-cols-3 gap-4 p-4 text-center">
        <div>
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-xl font-semibold">{totalTodos}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Selesai</p>
          <p className="text-xl font-semibold text-emerald-600">{completedTodos}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Aktif</p>
          <p className="text-xl font-semibold text-amber-600">{activeTodos}</p>
        </div>
      </CardContent>
    </Card>
  );
}
