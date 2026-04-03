import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts";

export default function PostsIndex() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              {post.category} · {post.date}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-slate-600">{post.summary}</CardContent>

          <CardFooter>
            <span className="text-xs text-slate-500">By {post.author}</span>
            <Button asChild size="sm">
              <Link to={post.id}>Baca Detail</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
