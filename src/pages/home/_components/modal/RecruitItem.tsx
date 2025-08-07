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
import { useAddPostModal } from "../../../../hooks/useAddPostModal";

export const RecruitItem = () => {
  const {
    title,
    description,
    recruitCount,
    position,
    selectedStackIds,
    setTitle,
    setDescription,
    setRecruitCount,
    setPosition,
    setSelectedStackIds,
  } = useAddPostModal();

  const [isRecruitPopoverOpen, setIsRecruitPopoverOpen] = useState(false);

  const handleRecruitCountSelect = (count: number) => {
    setRecruitCount(count);
    setIsRecruitPopoverOpen(false);
  };

  const handlePopoverOpenChange = (open: boolean) => {
    setIsRecruitPopoverOpen(open);
  };

  return (
    <div className="space-y-6">
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

      {/* 설명 입력 */}
      <div className="space-y-3">
        <Label>설명</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="프로젝트/모각코에 대한 설명을 입력하세요"
          className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary resize-none min-h-[150px]"
          maxLength={2000}
        />
        <div className="text-right text-sm text-brand-text">
          {description.length}/2000
        </div>
      </div>

      {/* 모집 인원 */}
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

      {/* 포지션 선택 */}
      <PositionSelector
        selectedPosition={position}
        onPositionChange={setPosition}
        label="포지션"
      />

      {/* 스택 선택 */}
      <StackSelector
        selectedStackIds={selectedStackIds}
        onStackChange={setSelectedStackIds}
        label="기술 스택"
      />
    </div>
  );
};
