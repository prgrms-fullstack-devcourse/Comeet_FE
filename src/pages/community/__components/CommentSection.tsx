import type { Comment } from "@/types/community.types";
import { CommentItem } from "./CommentItem";

interface CommentSectionProps {
  comments: Comment[];
  onToggleCommentLike: (commentId: number) => void;
  onToggleReplyLike: (replyId: number) => void;
}

export function CommentSection({
  comments,
  onToggleCommentLike,
  onToggleReplyLike,
}: CommentSectionProps) {
  const totalComments = comments.length;

  return (
    <div className="p-4 pb-0 flex flex-col  text-white">
      <h3 className="text-sm font-semibold">댓글 {totalComments}</h3>

      <div className="flex flex-col">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onToggleLike={onToggleCommentLike}
            onToggleReplyLike={onToggleReplyLike}
          />
        ))}
      </div>
    </div>
  );
}
