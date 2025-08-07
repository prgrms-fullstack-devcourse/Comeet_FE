import type { Comment } from "@/types/community";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { ReplyItem } from "./ReplyItem";

interface CommentItemProps {
  comment: Comment;
  onToggleLike: (commentId: number) => void;
  onToggleReplyLike: (replyId: number) => void;
}

export function CommentItem({
  comment,
  onToggleLike,
  onToggleReplyLike,
}: CommentItemProps) {
  return (
    <div>
      <div className="p-4 -mx-4 border-b border-brand-surface">
        <p className="py-2 text-sm leading-relaxed text-white">
          {comment.content}
        </p>

        <div className="flex items-center justify-between text-xs text-brand-text">
          <div className="flex items-center gap-x-2">
            <span className="font-medium">{comment.author.name}</span>
            <span>•</span>
            <span>{comment.createdAt}</span>
          </div>

          <div className="flex items-center ">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent hover:text-brand-text flex items-center"
              onClick={() => onToggleLike(comment.id)}>
              <Heart
                className="h-4 w-4"
                fill={comment.isLiked ? "#FF4A4A" : "none"}
                stroke={comment.isLiked ? "#FF4A4A" : "currentColor"}
              />
              <span className="-mt-0.5">{comment.likeCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent hover:text-brand-text flex items-center">
              <MessageCircle className="h-4 w-4" />
              <span className="-mt-0.5">{comment.replyCount}</span>
            </Button>
          </div>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className=" border-brand-surface ml-4">
          {comment.replies.map((reply) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              onToggleLike={onToggleReplyLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}
