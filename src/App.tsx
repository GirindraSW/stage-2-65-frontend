import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PostDetail from "./pages/PostDetail";
import Posts from "./pages/Posts";
import PostsIndex from "./pages/PostsIndex";
import { Button } from "./components/ui/button";

function App() {
  return (
    // <BrowserRouter></BrowserRouter>
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-6">
          <h1 className="text-lg font-semibold">Checkpoint 1 - Multi-Page Blog</h1>
          <nav className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <NavLink to="/">Home</NavLink>
            </Button>
            <Button asChild variant="outline" size="sm">
              <NavLink to="/about">About</NavLink>
            </Button>
            <Button asChild variant="outline" size="sm">
              <NavLink to="/posts">Posts</NavLink>
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Nested route */}
          <Route path="/posts" element={<Posts />}>
            <Route index element={<PostsIndex />} />
            {/* Dynamic route */}
            <Route path=":postId" element={<PostDetail />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
