import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts";

export default function PostDetail() {
  // Dynamic route param: nilai `postId` diambil dari URL `/posts/:postId`
  const { postId } = useParams<{ postId: string }>();

  const selectedPost = posts.find((post) => post.id === postId);

  if (!selectedPost) {
    return (
      <div className="rounded-xl border bg-white p-6">
        <h3 className="text-lg font-semibold">Post tidak ditemukan</h3>
        <p className="mt-2 text-sm text-slate-600">
          Coba kembali ke daftar post dan pilih id post yang valid.
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link to="/posts">Kembali ke Posts</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="space-y-3 rounded-xl border bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-sky-700">{selectedPost.category}</p>
      <h3 className="text-2xl font-semibold tracking-tight">{selectedPost.title}</h3>
      <p className="text-sm text-slate-500">
        {selectedPost.date} · {selectedPost.author}
      </p>
      <p className="text-sm leading-relaxed text-slate-700">{selectedPost.content}</p>

      <Button asChild variant="outline" size="sm">
        <Link to="/posts">Kembali ke daftar post</Link>
      </Button>
    </article>
  );
}
