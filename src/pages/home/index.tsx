import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import type { Post } from "@/types/board";
import { fetchPosts } from "@/lib/api";
import { BoardTabs } from "@/components/common/BoardTabs";

export const BoardPage = () => {
  const { category = "all" } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedPosts = await fetchPosts(category);
        setPosts(fetchedPosts);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [category]);

  return (
    <div className="dark text-foreground">
      <BoardTabs posts={posts} currentCategory={category} />
      <button className="absolute bottom-20 right-4 bg-brand-primary text-brand-background rounded-full p-4 hover:bg-brand-primary/90">
        <Plus className="size-8" />
      </button>
    </div>
  );
};
