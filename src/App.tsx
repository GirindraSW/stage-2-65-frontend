import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import TodoStats from "@/components/todo/TodoStats";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoProvider } from "@/context/TodoProvider";

// Layout utama halaman To-Do App.
function TodoAppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-8 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-3xl space-y-5">
        <header className="flex items-center justify-between rounded-xl border bg-card px-4 py-3 shadow-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Checkpoint 1
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">To-Do with Global State</h1>
          </div>
          <ThemeToggle />
        </header>

        <TodoStats />

        <Card>
          <CardHeader>
            <CardTitle>Tambah To-Do</CardTitle>
          </CardHeader>
          <CardContent>
            <TodoForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daftar To-Do</CardTitle>
          </CardHeader>
          <CardContent>
            <TodoList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// App membungkus layout dengan TodoProvider agar state bisa dipakai global.
export default function App() {
  return (
    <TodoProvider>
      <TodoAppLayout />
    </TodoProvider>
  );
}
