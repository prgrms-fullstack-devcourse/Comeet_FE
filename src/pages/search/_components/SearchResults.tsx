import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle } from "lucide-react";
import type { Post } from "@/types/post.types";
import { formatPostListDate } from "@/lib/date";

interface SearchResultsProps {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  query: string;
  isDebouncing?: boolean;
}

export default function SearchResults({
  posts,
  isLoading,
  isError,
  error,
  query,
  isDebouncing = false,
}: SearchResultsProps) {
  const navigate = useNavigate();

  const handlePostClick = (post: Post) => {
    navigate(`/community/${post.id}`);
  };

  if (isLoading || isDebouncing) {
    return (
      <div className="p-4 text-center text-white">
        <p>{isDebouncing ? "검색어 입력 중..." : "검색 중..."}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-white">
        <p>검색 중 오류가 발생했습니다:</p>
        <p className="text-red-400 text-sm mt-2">{error?.message}</p>
      </div>
    );
  }

  if (posts.length === 0 && query.trim()) {
    return (
      <div className="p-4 text-center text-brand-text">
        <p>"{query}"에 대한 검색 결과가 없습니다.</p>
      </div>
    );
  }

  if (!query.trim()) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <p className="text-white text-sm">
          "{query}" 검색 결과 {posts.length}개
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="bg-brand-surface border-none text-white hover:bg-brand-surface/50 transition-colors cursor-pointer"
            onClick={() => handlePostClick(post)}>
            <CardHeader>
              <Badge className="w-fit p-0 text-left bg-transparent border-none text-brand-primary">
                {post.board.value}
              </Badge>
              <CardTitle className="mt-2 text-base leading-tight">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center text-xs text-brand-text">
              <span>
                {post.author.nickname} · {formatPostListDate(post.createdAt)}
              </span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Heart className="size-4" aria-label="좋아요" />
                  <span className="w-3">{post.nLikes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="size-4" aria-label="댓글" />
                  <span className="w-3">{post.nComments}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
