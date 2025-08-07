import type { Reply } from "@/types/community";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface ReplyItemProps {
  reply: Reply;
  onToggleLike: (replyId: number) => void;
}

export function ReplyItem({ reply, onToggleLike }: ReplyItemProps) {
  return (
    <div className="p-4 -mx-4 border-b border-brand-surface ">
      <p className="py-2 text-sm leading-relaxed text-white">{reply.content}</p>

      <div className="flex items-center justify-between text-xs text-brand-text">
        <div className="flex items-center gap-x-2">
          <span className="font-medium">{reply.author.name}</span>
          <span>•</span>
          <span>{reply.createdAt}</span>
        </div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto hover:bg-transparent hover:text-brand-text flex items-center"
            onClick={() => onToggleLike(reply.id)}>
            <Heart
              className="h-4 w-4"
              fill={reply.isLiked ? "#FF4A4A" : "none"}
              stroke={reply.isLiked ? "#FF4A4A" : "currentColor"}
            />
            <span className="-mt-0.5">{reply.likeCount}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
