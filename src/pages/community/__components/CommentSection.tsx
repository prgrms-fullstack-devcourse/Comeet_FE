import type { CommentResponse } from "@/types/post.types";
import { CommentItem } from "./CommentItem";

interface CommentSectionProps {
  comments: CommentResponse[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  const totalComments = comments.length;

  return (
    <div className="p-4 pb-0 flex flex-col  text-white">
      <h3 className="text-sm font-semibold">댓글 {totalComments}</h3>

      <div className="flex flex-col">
        {comments
          .slice()
          .reverse()
          .map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
}
