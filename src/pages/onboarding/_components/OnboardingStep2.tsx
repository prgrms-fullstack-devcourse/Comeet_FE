import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PositionSelector } from "@/components/common/PositionSelector";
import { StackSelector } from "@/components/common/StackSelector";
import { usePositionsInterests } from "@/hooks/queries/useTags";
import { cn } from "@/lib/utils";
import type { OnboardingData } from "../index";

interface StepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: Partial<OnboardingData>;
}

export function OnboardingStep2({ onNext, data }: StepProps) {
  const [position, setPosition] = useState<number | null>(
    data.position || null
  );
  const [selectedStackIds, setSelectedStackIds] = useState<number[]>(
    data.techStack || []
  );
  const [selectedInterestIds, setSelectedInterestIds] = useState<number[]>(
    data.interests || []
  );
  const [isValid, setIsValid] = useState(false);

  const { data: positionsInterestsData, isLoading } = usePositionsInterests();

  // 유효성 검사
  useEffect(() => {
    const isValidForm =
      position !== null &&
      selectedStackIds.length > 0 &&
      selectedInterestIds.length > 0;

    setIsValid(isValidForm);
  }, [position, selectedStackIds, selectedInterestIds]);

  const handleInterestToggle = (topicId: number) => {
    const newInterestIds = selectedInterestIds.includes(topicId)
      ? selectedInterestIds.filter((id) => id !== topicId)
      : selectedInterestIds.length < 3
      ? [...selectedInterestIds, topicId]
      : selectedInterestIds;
    setSelectedInterestIds(newInterestIds);
  };

  const handleSubmit = () => {
    if (!isValid) {
      alert("포지션, 기술 스택, 관심 분야를 모두 선택해주세요.");
      return;
    }

    onNext({
      position: position!,
      techStack: selectedStackIds,
      interests: selectedInterestIds,
    });
  };

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (!positionsInterestsData?.interests) {
    return <div className="text-center">관심사를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="dark flex flex-col min-h-[70vh]">
      <div className="flex-grow space-y-8">
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

        <div className="space-y-3">
          <Label>관심 분야 (최대 3개)</Label>
          <div className="grid grid-cols-4 gap-2">
            {positionsInterestsData.interests.map((interest) => (
              <Button
                key={interest.id}
                variant="outline"
                onClick={() => handleInterestToggle(interest.id)}
                className={cn(
                  "rounded-md border-brand-surface bg-transparent hover:bg-brand-primary hover:text-white",
                  selectedInterestIds.includes(interest.id) &&
                    "border-brand-primary text-brand-primary border-1"
                )}>
                <span className="text-sm">{interest.value}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className={cn(
            "w-full font-bold text-lg py-6",
            isValid
              ? "bg-brand-primary hover:bg-brand-primary/80 text-black"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          )}>
          다음
        </Button>
      </div>
    </div>
  );
}
