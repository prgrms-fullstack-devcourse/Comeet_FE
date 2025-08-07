import type { Post } from "@/types/community.types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface PostContentProps {
  post: Post;
  onLikeClick: () => void;
  isLikePending: boolean;
}

export function PostContent({ post, onLikeClick }: PostContentProps) {
  return (
    <main className="w-full flex flex-col text-white">
      <div className="p-4 flex flex-col gap-y-4">
        <Badge
          variant="outline"
          className="w-fit border-brand-primary text-brand-primary">
          {post.category}
        </Badge>
        <h2 className="text-xl font-bold">{post.title}</h2>
        <div className="flex items-center gap-x-2 text-xs text-brand-text">
          <span>{post.author.name}</span>
          <span>•</span>
          <span>{post.createdAt}</span>
        </div>
      </div>

      <Separator className="w-full bg-brand-surface " />

      <div className="p-4 flex flex-col ">
        <div className="min-h-[200px] text-sm leading-relaxed whitespace-pre-wrap break-words">
          {post.content}
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 hover:bg-white/10 rounded-full -ml-2"
            onClick={onLikeClick}>
            <Heart
              className="!h-6 !w-6"
              fill={post.isLiked ? "#FF4A4A" : "none"}
              stroke={post.isLiked ? "#FF4A4A" : "currentColor"}
            />
          </Button>

          <span className="text-xs font-semibold flex items-center -mt-0.5">
            {post.likeCount}
          </span>
        </div>
      </div>

      <Separator className="bg-brand-surface !h-1" />
    </main>
  );
}
