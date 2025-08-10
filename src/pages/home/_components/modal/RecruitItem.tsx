import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { PositionSelector } from "@/components/common/PositionSelector";
import { StackSelector } from "@/components/common/StackSelector";

interface RecruitItemProps {
  title: string;
  description: string;
  recruitCount: number;
  position: number | null;
  selectedPositionIds: number[];
  selectedStackIds: number[];
  boardValue: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onRecruitCountChange: (count: number) => void;
  onPositionChange: (position: number | null) => void;
  onPositionIdsChange: (positionIds: number[]) => void;
  onStackIdsChange: (stackIds: number[]) => void;
}

export const RecruitItem = ({
  title,
  description,
  recruitCount,
  position,
  selectedPositionIds,
  selectedStackIds,
  boardValue,
  onTitleChange,
  onDescriptionChange,
  onRecruitCountChange,
  onPositionChange,
  onPositionIdsChange,
  onStackIdsChange,
}: RecruitItemProps) => {
  const [isRecruitPopoverOpen, setIsRecruitPopoverOpen] = useState(false);

  const handleRecruitCountSelect = (count: number) => {
    onRecruitCountChange(count);
    setIsRecruitPopoverOpen(false);
  };

  const handlePopoverOpenChange = (open: boolean) => {
    setIsRecruitPopoverOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>제목</Label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="제목을 입력하세요"
          className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary"
          maxLength={100}
        />
        <div className="text-right text-sm text-brand-text">
          {title.length}/100
        </div>
      </div>
      <div className="space-y-3">
        <Label>설명</Label>
        <Textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="프로젝트/모각코에 대한 설명을 입력하세요"
          className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary resize-none min-h-[150px]"
          maxLength={2000}
        />
        <div className="text-right text-sm text-brand-text">
          {description.length}/2000
        </div>
      </div>
      <div className="space-y-3">
        <Label>모집 인원</Label>
        <Popover
          open={isRecruitPopoverOpen}
          onOpenChange={handlePopoverOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isRecruitPopoverOpen}
              className="w-full justify-between bg-brand-surface border-transparent hover:bg-brand-primary hover:text-white">
              {recruitCount}명
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={4}
            avoidCollisions={true}
            className="w-[var(--radix-popover-trigger-width)] p-0 border-transparent z-[9999] bg-brand-surface max-h-[200px] overflow-y-auto scrollbar-hide">
            <div className="p-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                <Button
                  key={count}
                  variant="ghost"
                  onClick={() => handleRecruitCountSelect(count)}
                  className="w-full justify-start text-white hover:bg-brand-primary">
                  {count}명
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {/* 모각코에서는 포지션 제외, 프로젝트에서는 포지션 다중 선택 가능 */}
      {boardValue === "프로젝트" && (
        <PositionSelector
          selectedPosition={position}
          selectedPositionIds={selectedPositionIds}
          onPositionChange={onPositionChange}
          onPositionIdsChange={onPositionIdsChange}
          label="포지션"
          multiple={true}
        />
      )}
      <StackSelector
        selectedStackIds={selectedStackIds}
        onStackChange={onStackIdsChange}
        label="기술 스택"
      />
    </div>
  );
};
