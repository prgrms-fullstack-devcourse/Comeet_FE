import { useState, useEffect } from "react";
import type { OnboardingData } from "@/pages/onboarding/index.tsx";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { PositionSelector } from "@/components/common/PositionSelector";
import { StackSelector } from "@/components/common/StackSelector";

const INTEREST_TOPICS = [
  { id: 1, name: "업계 동향" },
  { id: 2, name: "직무 정보" },
  { id: 3, name: "커피챗" },
  { id: 4, name: "정보 공유" },
  { id: 5, name: "취업 준비" },
  { id: 6, name: "자기계발" },
  { id: 7, name: "이벤트" },
  { id: 8, name: "기타" },
];

interface StepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: Partial<OnboardingData>;
}

export function OnboardingStep2({ onNext, data }: StepProps) {
  const [position, setPosition] = useState<number | undefined>(data.position);
  const [selectedStackIds, setSelectedStackIds] = useState<number[]>(
    data.techStack || []
  );
  const [selectedInterestIds, setSelectedInterestIds] = useState<number[]>(
    data.interests || []
  );
  const [isValid, setIsValid] = useState(false);

  // 유효성 검사
  useEffect(() => {
    const isValidForm =
      position !== undefined &&
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

  return (
    <div className="dark flex flex-col min-h-[70vh]">
      <div className="flex-grow space-y-8">
        {/* 포지션 */}
        <PositionSelector
          selectedPosition={position || null}
          onPositionChange={(positionId) => setPosition(positionId)}
        />

        {/* 기술 스택 */}
        <StackSelector
          selectedStackIds={selectedStackIds}
          onStackChange={setSelectedStackIds}
        />

        <div className="space-y-3">
          <Label>관심 분야 (최대 3개)</Label>
          <div className="grid grid-cols-4 gap-2">
            {INTEREST_TOPICS.map((topic) => (
              <Button
                key={topic.id}
                variant="outline"
                onClick={() => handleInterestToggle(topic.id)}
                className={cn(
                  "rounded-md border-brand-surface bg-transparent hover:bg-brand-primary hover:text-white",
                  selectedInterestIds.includes(topic.id) &&
                    "border-brand-primary text-brand-primary border-1"
                )}>
                {topic.name}
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
