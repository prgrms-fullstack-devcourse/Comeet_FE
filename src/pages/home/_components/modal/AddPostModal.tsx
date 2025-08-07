import { Button } from "@/components/ui/button";
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
import { PostItem } from "./PostItem";
import { RecruitItem } from "./RecruitItem";
import { useAddPostModal } from "../../../../hooks/useAddPostModal";

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
  const {
    title,
    content,
    selectedBoard,
    description,
    recruitCount,
    position,
    selectedStackIds,
    isRecruitBoard,
    setSelectedBoard,
    reset,
  } = useAddPostModal();

  const handleSubmit = () => {};

  const handleClose = () => {
    reset();
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
          isSubmitting ||
          !title.trim() ||
          !selectedBoard ||
          (isRecruitBoard
            ? !description.trim() || !position || selectedStackIds.length === 0
            : !content.trim())
        }
        className="flex-1 bg-brand-primary   hover:bg-brand-primary/90 font-bold text-base py-6">
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

        {/*포스트, 리크루트 조건부 렌더링*/}
        {isRecruitBoard ? <RecruitItem /> : <PostItem />}
      </div>
    </ModalWrapper>
  );
};
