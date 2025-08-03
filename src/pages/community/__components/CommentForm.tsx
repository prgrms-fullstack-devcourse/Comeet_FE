import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isPending: boolean;
}

export function CommentForm({ onSubmit, isPending }: CommentFormProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit(comment);
    setComment("");
  };

  return (
    <div className="flex items-center p-2 bg-brand-background border-t border-gray-700">
      <Textarea
        placeholder="댓글을 입력해주세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1 bg-gray-700 border-none rounded-full px-4 py-2 resize-none no-scrollbar text-white"
        rows={1}
        disabled={isPending}
      />
      <Button
        onClick={handleSubmit}
        disabled={!comment.trim() || isPending}
        variant="ghost"
        className="ml-2 text-brand-primary"
      >
        입력
      </Button>
    </div>
  );
}
