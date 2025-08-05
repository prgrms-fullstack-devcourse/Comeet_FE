import type { Post } from "@/types/community";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface PostContentProps {
  post: Post;
  onLikeClick: () => void;
  isLikePending: boolean;
}

export function PostContent({
  post,
  onLikeClick,
  isLikePending,
}: PostContentProps) {
  return (
    <main className="flex flex-col gap-y-4 text-white">
      <Badge
        variant="outline"
        className="w-fit border-brand-primary text-brand-primary"
      >
        {post.category}
      </Badge>
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <div className="flex items-center gap-x-2 text-sm text-gray-400">
        <span>{post.author.name}</span>
        <Separator orientation="vertical" className="h-3" />
        <span>{post.createdAt}</span>
      </div>
      <Separator className="my-2 bg-gray-700" />
      <div className="min-h-[200px] py-4 text-base whitespace-pre-wrap">
        {post.content}
      </div>
      <div className="flex items-center gap-x-2 py-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-white/10 rounded-full"
          onClick={onLikeClick}
          disabled={isLikePending}
        >
          <Heart
            className="h-6 w-6"
            fill={post.isLiked ? "#FF4A4A" : "none"}
            stroke={post.isLiked ? "#FF4A4A" : "currentColor"}
          />
        </Button>
        <span className="text-sm font-semibold">{post.likeCount}</span>
      </div>
      <Separator className="bg-gray-700 h-1" />
    </main>
  );
}
