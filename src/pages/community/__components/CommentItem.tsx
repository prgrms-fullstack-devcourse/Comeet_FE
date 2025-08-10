import type { CommentResponse } from "@/types/post.types";
import { formatCommentDate } from "@/lib/date";

interface CommentItemProps {
  comment: CommentResponse;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="p-4 -mx-4 border-b border-brand-surface">
      <p className="py-2 text-sm leading-relaxed text-white">
        {comment.content}
      </p>

      <div className="flex items-center justify-between text-xs text-brand-text">
        <div className="flex items-center gap-x-2">
          <span className="font-medium">{comment.author.nickname}</span>
          <span>•</span>
          <span>{formatCommentDate(comment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
