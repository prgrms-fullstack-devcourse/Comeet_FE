import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center p-2 bg-brand-background border-t border-brand-surface">
      <Input
        placeholder="댓글을 입력해주세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 bg-brand-surface border-none rounded-md px-4 py-2 resize-none no-scrollbar text-sm text-white ring-0"
        disabled={isPending}
      />
      <Button
        onClick={handleSubmit}
        disabled={!comment.trim() || isPending}
        variant="ghost"
        className="ml-2 text-brand-primary text-sm">
        입력
      </Button>
    </div>
  );
}
