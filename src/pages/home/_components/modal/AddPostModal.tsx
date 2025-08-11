import { useEffect } from "react";
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
import {
  usePositionsInterests,
  useStacks,
} from "../../../../hooks/queries/useTags";
import { useLocationQuery } from "../../../../hooks/queries/useLocationQuery";

interface AddPostModalProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    content: string;
    boardId: number;
    location: { lat: number; lng: number };
  }) => void;
  isSubmitting?: boolean;
  initialData?: {
    title: string;
    content: string;
    boardId: number;
  };
}

export const AddPostModal = ({
  onClose,
  onSubmit,
  isSubmitting = false,
  initialData,
}: AddPostModalProps) => {
  const {
    title,
    content,
    selectedBoard,
    description,
    recruitCount,
    position,
    selectedPositionIds,
    selectedStackIds,
    location,
    isRecruitBoard,
    setTitle,
    setContent,
    setSelectedBoard,
    setDescription,
    setRecruitCount,
    setPosition,
    setSelectedPositionIds,
    setSelectedStackIds,
    setLocation,
    reset,
  } = useAddPostModal();

  const { data: boards = [] } = useBoards();
  const { data: positionsInterestsData } = usePositionsInterests();
  const { data: stacks } = useStacks();
  const { location: currentLocation, refetchLocation } = useLocationQuery();

  useEffect(() => {
    if (currentLocation && !location) {
      setLocation(currentLocation);
    }
  }, [currentLocation, location, setLocation]);

  useEffect(() => {
    if (!location && currentLocation) {
      setLocation(currentLocation);
    }
  }, [location, currentLocation, setLocation]);

  useEffect(() => {
    if (initialData && !location) {
      if (currentLocation) {
        setLocation(currentLocation);
      } else {
        refetchLocation().then(() => {
          console.log("위치 정보 다시 가져오기 완료");
        });
      }
    }
  }, [initialData, currentLocation, location, setLocation, refetchLocation]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      const board = boards.find((b) => b.id === initialData.boardId);
      if (board) {
        setSelectedBoard(board.value);
      }
    }
  }, [initialData, boards]);

  const handleSubmit = () => {
    if (!title.trim() || !selectedBoard) {
      return;
    }

    if (isRecruitBoard) {
      if (!description.trim() || selectedStackIds.length === 0) {
        return;
      }
      if (selectedBoard === "프로젝트" && selectedPositionIds.length === 0) {
        return;
      }
    } else {
      if (!content.trim()) {
        return;
      }
    }

    if (!location) {
      alert("위치 정보가 필요합니다. 위치 정보를 설정해주세요.");
      return;
    }

    const selectedBoardData = boards.find(
      (board) => board.value === selectedBoard
    );
    if (!selectedBoardData) return;

    let finalContent = isRecruitBoard ? description.trim() : content.trim();

    if (isRecruitBoard) {
      finalContent += `\n\n모집 인원: ${recruitCount}명`;
      if (selectedBoard === "프로젝트" && selectedPositionIds.length > 0) {
        const positions = positionsInterestsData?.positions || [];
        const selectedPositions = positions.filter((pos) =>
          selectedPositionIds.includes(pos.id)
        );
        const positionText = selectedPositions
          .map((pos) => pos.role)
          .join(", ");
        finalContent += `\n포지션: ${positionText}`;
      }
      const selectedStacks =
        stacks?.filter((stack) => selectedStackIds.includes(stack.id)) || [];
      const stackText = selectedStacks.map((stack) => stack.value).join(", ");
      finalContent += `\n기술스택: ${stackText}`;
    }

    const postData = {
      title: title.trim(),
      content: finalContent,
      boardId: selectedBoardData.id,
      location,
    };

    onSubmit(postData);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const isDisabled =
    isSubmitting ||
    !title.trim() ||
    !selectedBoard ||
    (isRecruitBoard
      ? !description.trim() ||
        selectedStackIds.length === 0 ||
        (selectedBoard === "프로젝트" && selectedPositionIds.length === 0)
      : !content.trim()) ||
    !location;

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
        disabled={isDisabled}
        className="flex-1 bg-brand-primary hover:bg-brand-primary/90 font-bold text-base py-6">
        {isSubmitting ? "작성 중..." : "작성하기"}
      </Button>
    </div>
  );

  return (
    <ModalWrapper title="게시글 작성" onClose={handleClose} footer={footer}>
      <div className="space-y-6">
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
        {isRecruitBoard ? (
          <RecruitItem
            title={title}
            description={description}
            recruitCount={recruitCount}
            position={position}
            selectedPositionIds={selectedPositionIds}
            selectedStackIds={selectedStackIds}
            boardValue={selectedBoard}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onRecruitCountChange={setRecruitCount}
            onPositionChange={setPosition}
            onPositionIdsChange={setSelectedPositionIds}
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
