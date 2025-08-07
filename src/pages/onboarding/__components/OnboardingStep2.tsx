import { useState } from "react";
import type { OnboardingData } from "@/pages/onboarding/OnboardingPage";
import { usePositionsAndInterests } from "@/hooks/useTags";
import type { TypeDTO } from "@/hooks/useTags";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Frown } from "lucide-react";

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
  const {
    data: tagsData,
    isLoading: isLoadingTags,
    isError,
    error,
  } = usePositionsAndInterests();

  const [position, setPosition] = useState<number | undefined>(data.position);

  const [selectedStackIds, setSelectedStackIds] = useState<number[]>(
    data.techStack || []
  );

  const [selectedInterestIds, setSelectedInterestIds] = useState<number[]>(
    data.interests || []
  );

  const handleInterestToggle = (topicId: number) => {
    const isSelected = selectedInterestIds.includes(topicId);
    if (isSelected) {
      setSelectedInterestIds(
        selectedInterestIds.filter((id) => id !== topicId)
      );
    } else if (selectedInterestIds.length < 3) {
      setSelectedInterestIds([...selectedInterestIds, topicId]);
    }
  };

  const handleSubmit = () => {
    if (position == null) {
      alert("포지션을 선택해주세요.");
      return;
    }
    if (selectedInterestIds.length === 0) {
      alert("관심 분야를 1개 이상 선택해주세요.");
      return;
    }
    onNext({
      position,
      techStack: selectedStackIds,
      interests: selectedInterestIds,
    });
  };

  return (
    <div className="dark flex flex-col min-h-[75vh]">
      <div className="flex-grow space-y-8">
        <div>
          <Label>포지션</Label>
          <div className="w-full border rounded-md border-gray-700 p-4 bg-gray-900">
            {isLoadingTags && (
              <div className="text-gray-400">포지션 목록을 불러오는 중...</div>
            )}
            {isError && (
              <div className="text-red-500 flex items-center gap-2">
                <Frown size={18} /> {error.message}
              </div>
            )}
            {!isLoadingTags && !isError && tagsData?.positions && (
              <div className="grid grid-cols-2 gap-2">
                {tagsData.positions.map((pos) => (
                  <Button
                    key={pos.id}
                    variant="outline"
                    onClick={() => setPosition(pos.id)}
                    className={cn(
                      "h-auto justify-start text-left whitespace-normal border-gray-600 bg-gray-800",
                      position === pos.id &&
                        "border-brand-primary text-brand-primary border-2"
                    )}
                  >
                    <span className="font-bold">{pos.role}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label>기술 스택 / 분야</Label>
          <StackSelector
            selectedStackIds={selectedStackIds}
            onStackChange={setSelectedStackIds}
          />
        </div>

        <div>
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
                    "border-brand-primary text-brand-primary border-2"
                )}
              >
                {topic.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          className="w-full bg-brand-primary hover:bg-brand-primary/80 text-black font-bold text-lg py-6"
        >
          다음
        </Button>
      </div>
    </div>
  );
}

interface StackSelectorProps {
  selectedStackIds: number[];
  onStackChange: (ids: number[]) => void;
}
function StackSelector({
  selectedStackIds,
  onStackChange,
}: StackSelectorProps) {
  const RECOMMENDED_STACKS = [
    { id: 1, label: "React" },
    { id: 2, label: "TypeScript" },
    { id: 3, label: "JavaScript" },
    { id: 4, label: "Next.js" },
    { id: 6, label: "Java" },
    { id: 7, label: "Spring" },
    { id: 8, label: "Python" },
    { id: 11, label: "NestJS" },
  ];

  const handleToggle = (id: number) => {
    if (selectedStackIds.includes(id)) {
      onStackChange(selectedStackIds.filter((stackId) => stackId !== id));
    } else {
      onStackChange([...selectedStackIds, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-gray-700 rounded-md bg-gray-900">
      {RECOMMENDED_STACKS.map((stack) => (
        <Button
          key={stack.id}
          variant="outline"
          onClick={() => handleToggle(stack.id)}
          className={cn(
            "bg-gray-800 border-gray-600 text-white",
            selectedStackIds.includes(stack.id) &&
              "bg-brand-primary border-brand-primary text-black"
          )}
        >
          {stack.label}
        </Button>
      ))}
    </div>
  );
}