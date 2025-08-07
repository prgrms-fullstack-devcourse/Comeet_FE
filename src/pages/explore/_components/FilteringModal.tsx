import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ModalWrapper } from "@/components/common/ModalWrapper";
import { PositionSelector } from "@/components/common/PositionSelector";
import { StackSelector } from "@/components/common/StackSelector";

interface FilteringModalProps {
  onClose: () => void;
}

export const FilteringModal = ({ onClose }: FilteringModalProps) => {
  const [distance, setDistance] = useState([5]);
  const [age, setAge] = useState([35]);
  const [position, setPosition] = useState<number | null>(null);
  const [selectedStackIds, setSelectedStackIds] = useState<number[]>([]);

  const handleSubmit = () => {
    // TODO: 필터 적용 로직
    console.log({
      distance: distance[0],
      age: age[0],
      position,
      stacks: selectedStackIds,
    });
    onClose();
  };

  const handleReset = () => {
    setDistance([5]);
    setAge([35]);
    setPosition(null);
    setSelectedStackIds([]);
  };

  const footer = (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={handleReset}
        className="h-full aspect-square bg-brand-surface hover:bg-brand-surface/90 border-0">
        <RotateCcw className="size-6" />
      </Button>
      <Button
        onClick={handleSubmit}
        className="flex-1 bg-brand-surface hover:bg-brand-surface/90 font-bold text-base py-6">
        적용하기
      </Button>
    </div>
  );

  return (
    <ModalWrapper title="조건 설정" onClose={onClose} footer={footer}>
      <div className="space-y-8">
        {/* 거리 */}
        <div className="space-y-3">
          <Label>거리 (km)</Label>
          <Slider
            value={distance}
            onValueChange={setDistance}
            max={50}
            step={1}
          />
          <div className="text-right text-sm text-brand-text">
            최대 {distance[0]}km
          </div>
        </div>

        {/* 나이 */}
        <div className="space-y-3">
          <Label>나이</Label>
          <Slider
            value={age}
            onValueChange={setAge}
            max={60}
            min={18}
            step={1}
          />
          <div className="text-right text-sm text-brand-text">
            최대 {age[0]}세
          </div>
        </div>

        {/* 포지션 */}
        <PositionSelector
          selectedPosition={position}
          onPositionChange={setPosition}
        />

        {/* 기술 스택 */}
        <StackSelector
          selectedStackIds={selectedStackIds}
          onStackChange={setSelectedStackIds}
        />
      </div>
    </ModalWrapper>
  );
};
