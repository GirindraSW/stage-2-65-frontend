import TodoList from "./components/TodoList"; // impor komponen todo list
import "./App.css"; // mengimpor css untuk styling

// komponen utama
function App() {
  return (
    // container utama
    <div className="app">
      {/* // elemen header */}
      <header className="app__header">
        <p className="app__eyebrow">Checkpoint 1 To-Do List</p>
        <h1>Daily Focus Board</h1>
        <p className="app__sub">
          Klik item untuk toggle selesai. Yang selesai akan dicoret otomatis.
        </p>
      </header>

      {/* berisi konten aplikasi */}
      <main className="app__main">
        <TodoList />{/*memanggil ckomponen todolist*/}
      </main>
    </div>
  );
}

export default App;