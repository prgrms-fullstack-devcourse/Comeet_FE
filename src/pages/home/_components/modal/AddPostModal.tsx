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
import { PostItem } from "./PostItem";
import { RecruitItem } from "./RecruitItem";
import { useAddPostModal } from "../../../../hooks/useAddPostModal";
import { useBoards } from "../../../../hooks/queries/usePosts";

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
    setTitle,
    setContent,
    setSelectedBoard,
    setDescription,
    setRecruitCount,
    setPosition,
    setSelectedStackIds,
    reset,
  } = useAddPostModal();

  const { data: boards = [] } = useBoards();

  const handleSubmit = () => {
    if (!title.trim() || !selectedBoard) {
      return;
    }

    if (isRecruitBoard) {
      if (!description.trim() || !position || selectedStackIds.length === 0) {
        return;
      }
    } else {
      if (!content.trim()) {
        return;
      }
    }

    const selectedBoardData = boards.find(
      (board) => board.value === selectedBoard
    );
    if (!selectedBoardData) return;

    const postData = {
      title: title.trim(),
      content: isRecruitBoard ? description.trim() : content.trim(),
      boardId: selectedBoardData.id,
    };

    onSubmit(postData);
  };

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
              {boards.map((board) => (
                <SelectItem
                  key={board.id}
                  value={board.value}
                  className="text-white hover:bg-brand-primary/20 focus:bg-brand-primary">
                  {board.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/*포스트, 리크루트 조건부 렌더링*/}
        {isRecruitBoard ? (
          <RecruitItem
            title={title}
            description={description}
            recruitCount={recruitCount}
            position={position}
            selectedStackIds={selectedStackIds}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onRecruitCountChange={setRecruitCount}
            onPositionChange={setPosition}
            onStackIdsChange={setSelectedStackIds}
          />
        ) : (
          <PostItem
            title={title}
            content={content}
            onTitleChange={setTitle}
            onContentChange={setContent}
          />
        )}
      </div>
    </ModalWrapper>
  );
};
