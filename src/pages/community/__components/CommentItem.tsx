import type { Comment } from "@/types/community";
import { Button } from "@/components/ui/button";

interface CommentItemProps {
  comment: Comment;
  onToggleLike: (commentId: number) => void;
}

export function CommentItem({ comment, onToggleLike }: CommentItemProps) {
  return (
    <div>
      <div className="flex-1">
        <p className="py-2 text-base text-white">{comment.content}</p>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-x-2">
            <span className="font-semibold">{comment.author.name}</span>
            <span>{comment.createdAt}</span>
          </div>

          <div className="flex items-center gap-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent hover:text-gray-400"
              onClick={() => onToggleLike(comment.id)}
            >
              좋아요 {comment.likeCount}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent hover:text-gray-400"
            >
              답글
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
