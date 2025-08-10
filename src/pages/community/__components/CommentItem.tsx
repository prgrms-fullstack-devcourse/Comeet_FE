import type { CommentResponse } from "@/types/post.types";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCommentDate } from "@/lib/date";

interface CommentItemProps {
  comment: CommentResponse;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export function CommentItem({
  comment,
  onEditClick,
  onDeleteClick,
}: CommentItemProps) {
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

        {comment.editable && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-white/10 rounded-full">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 -mt-2 bg-brand-surface border-brand-surface text-white">
              <DropdownMenuItem
                onClick={onEditClick}
                className="hover:bg-brand-primary hover:text-black cursor-pointer">
                수정
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDeleteClick}
                className="hover:bg-red-500 hover:text-white cursor-pointer">
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
