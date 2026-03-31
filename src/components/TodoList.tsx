import React, { useState } from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean; // Status apakah to-do sudah selesai atau belum
}

// Mendefinisikan komponen TodoList sebagai React Functional Component
const TodoList: React.FC = () => {
  // Menggunakan hook useState untuk menyimpan state daftar to-do
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Belajar React", completed: false },
    { id: 2, text: "Buat to-do list", completed: true },
    { id: 3, text: "Review kode", completed: false },
  ]);

  // Fungsi untuk toggle status completed dari to-do berdasarkan ID
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        // Jika ID to-do sama dengan ID yang diberikan, toggle status completed
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Menghitung jumlah to-do yang sudah selesai
  const completedCount = todos.filter((todo) => todo.completed).length;
  // Mengembalikan JSX yang akan ditampilkan di browser (javascript syntax) seperti HTML memudahkan visualisasi struktur DOM (Document of model)
  return (
    <section className="todo-card">
      <div className="todo-card__header">
        <h2>Daftar To-Do</h2>
        <span className="todo-card__count">
          {completedCount}/{todos.length} selesai
        </span>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="todo-empty">Belum ada tugas. Yuk mulai!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={() => toggleTodo(todo.id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default TodoList;
