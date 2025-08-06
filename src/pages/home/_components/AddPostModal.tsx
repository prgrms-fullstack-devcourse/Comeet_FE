import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ModalWrapper } from "@/components/common/ModalWrapper";
import { BOARD_CATEGORIES } from "@/constants/board";

interface AddPostModalProps {
  onClose: () => void;
  onSubmit: (data: { title: string; content: string; boardId: number }) => void;
  isSubmitting?: boolean;
}

export const AddPostModal = ({
  onClose,
  onSubmit,
  isSubmitting = false,
}: AddPostModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedBoard, setSelectedBoard] = useState<string>("");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !selectedBoard) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const boardId = parseInt(selectedBoard);
    onSubmit({ title: title.trim(), content: content.trim(), boardId });
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    setSelectedBoard("");
    onClose();
  };

  const footer = (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={handleClose}
        className="flex-1 bg-brand-surface hover:bg-brand-surface/90 border-0 py-6">
        취소
      </Button>
      <Button
        onClick={handleSubmit}
        disabled={
          isSubmitting || !title.trim() || !content.trim() || !selectedBoard
        }
        className="flex-1 bg-brand-primary hover:bg-brand-primary/90 font-bold text-base py-6">
        {isSubmitting ? "작성 중..." : "작성하기"}
      </Button>
    </div>
  );

  return (
    <ModalWrapper title="게시글 작성" onClose={handleClose} footer={footer}>
      <div className="space-y-6">
        {/* 게시판 선택 */}
        <div className="space-y-3">
          <Label>게시판</Label>
          <Select value={selectedBoard} onValueChange={setSelectedBoard}>
            <SelectTrigger className="w-full bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary">
              <SelectValue placeholder="게시판을 선택하세요" />
            </SelectTrigger>
            <SelectContent className="bg-brand-surface border-transparent text-white">
              {BOARD_CATEGORIES.filter((cat) => cat.value !== "all").map(
                (category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="text-white hover:bg-brand-primary/20 focus:bg-brand-primary">
                    {category.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        {/* 제목 입력 */}
        <div className="space-y-3">
          <Label>제목</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary"
            maxLength={100}
          />
          <div className="text-right text-sm text-brand-text">
            {title.length}/100
          </div>
        </div>

        {/* 내용 입력 */}
        <div className="space-y-3">
          <Label>내용</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary resize-none min-h-[200px]"
            maxLength={2000}
          />
          <div className="text-right text-sm text-brand-text">
            {content.length}/2000
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
