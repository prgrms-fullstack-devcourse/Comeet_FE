import type { Comment } from "@/types/community";
import { CommentItem } from "./CommentItem";

interface CommentSectionProps {
  comments: Comment[];
  onToggleCommentLike: (commentId: number) => void;
}

export function CommentSection({
  comments,
  onToggleCommentLike,
}: CommentSectionProps) {
  const totalComments = comments.length;

  return (
    <div className="py-4 flex flex-col gap-y-6 text-white">
      <h3 className="text-lg font-bold">댓글 {totalComments}</h3>

      <div className="flex flex-col gap-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onToggleLike={onToggleCommentLike}
          />
        ))}
      </div>
    </div>
  );
}
