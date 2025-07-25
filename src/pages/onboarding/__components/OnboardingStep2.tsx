import { useState } from "react";
import type { OnboardingData } from "@/pages/onboarding/OnboardingPage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

const POSITION_DATA = [
  {
    category: "개발",
    positions: [
      {
        id: 101,
        name: "Frontend Developer",
        description: "React, Vue, Angular 등 프론트엔드 기술",
      },
      {
        id: 102,
        name: "Backend Developer",
        description: "Node.js, Python, Java 등 서버 개발",
      },
      {
        id: 103,
        name: "Fullstack Developer",
        description: "프론트엔드와 백엔드 모두 가능",
      },
      {
        id: 104,
        name: "Mobile Developer",
        description: "iOS, Android, React Native, Flutter",
      },
      {
        id: 105,
        name: "Game Developer",
        description: "게임 엔진, 게임 기획 및 개발",
      },
      {
        id: 106,
        name: "Embedded Developer",
        description: "IoT, 하드웨어, 임베디드 시스템",
      },
      {
        id: 107,
        name: "Blockchain Developer",
        description: "블록체인, 스마트 컨트랙트",
      },
    ],
  },
  {
    category: "인프라",
    positions: [
      {
        id: 201,
        name: "DevOps Engineer",
        description: "CI/CD, 클라우드, 인프라 관리",
      },
      {
        id: 202,
        name: "Security Engineer",
        description: "보안 시스템, 취약점 분석",
      },
    ],
  },
  {
    category: "데이터",
    positions: [
      {
        id: 301,
        name: "AI/ML Engineer",
        description: "머신러닝, 딥러닝, 데이터 분석",
      },
      {
        id: 302,
        name: "Data Engineer",
        description: "데이터 파이프라인, 빅데이터 처리",
      },
      {
        id: 303,
        name: "Data Scientist",
        description: "데이터 분석, 통계, 비즈니스 인사이트",
      },
    ],
  },
  {
    category: "기획/디자인",
    positions: [
      {
        id: 501,
        name: "Product Manager",
        description: "제품 기획, 프로젝트 관리",
      },
      {
        id: 502,
        name: "UI/UX Designer",
        description: "사용자 경험, 인터페이스 디자인",
      },
      { id: 503, name: "QA Engineer", description: "테스트, 품질 관리" },
    ],
  },
];
const ALL_STACKS = [
  { id: 1, value: "react", label: "React" },
  { id: 2, value: "typescript", label: "TypeScript" },
  { id: 3, value: "javascript", label: "JavaScript" },
  { id: 4, value: "next.js", label: "Next.js" },
  { id: 5, value: "vue", label: "Vue.js" },
  { id: 6, value: "java", label: "Java" },
  { id: 7, value: "spring", label: "Spring" },
  { id: 8, value: "python", label: "Python" },
  { id: 9, value: "django", label: "Django" },
];
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
  const [open, setOpen] = useState(false);
  const [selectedStackIds, setSelectedStackIds] = useState<number[]>(
    data.techStack || []
  );
  const [selectedInterestIds, setSelectedInterestIds] = useState<number[]>(
    data.interests || []
  );

  const handleSelectStack = (stackId: number) => {
    const newStackIds = selectedStackIds.includes(stackId)
      ? selectedStackIds.filter((id) => id !== stackId)
      : [...selectedStackIds, stackId];
    setSelectedStackIds(newStackIds);
    setOpen(false);
  };
  const handleRemoveStack = (stackIdToRemove: number) => {
    setSelectedStackIds(
      selectedStackIds.filter((id) => id !== stackIdToRemove)
    );
  };

  const handleInterestToggle = (topicId: number) => {
    const newInterestIds = selectedInterestIds.includes(topicId)
      ? selectedInterestIds.filter((id) => id !== topicId)
      : [...selectedInterestIds, topicId];
    setSelectedInterestIds(newInterestIds);
  };

  const handleSubmit = () => {
    if (!position) {
      alert("포지션을 선택해주세요.");
      return;
    }
    if (selectedInterestIds.length === 0) {
      alert("관심 분야를 1개 이상 선택해주세요.");
      return;
    }
    onNext({
      position: position,
      techStack: selectedStackIds,
      interests: selectedInterestIds,
    });
  };

  return (
    <div className="flex flex-col min-h-[75vh]">
      <div className="flex-grow space-y-8">
        <div className="space-y-3">
          <Label>포지션</Label>
          <Accordion
            type="single"
            collapsible
            className="w-full border rounded-md border-gray-700"
          >
            {POSITION_DATA.map((cat) => (
              <AccordionItem
                key={cat.category}
                value={cat.category}
                className="px-4 border-b-gray-700 last:border-b-0"
              >
                <AccordionTrigger className="hover:no-underline">
                  {cat.category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 pt-2">
                    {cat.positions.map((pos) => (
                      <Button
                        key={pos.id}
                        variant="outline"
                        onClick={() => setPosition(pos.id)}
                        className={cn(
                          "h-auto justify-start text-left whitespace-normal border-gray-600 bg-gray-800",
                          position === pos.id &&
                            "border-lime-400 text-lime-400 border-2"
                        )}
                      >
                        <div className="flex flex-col">
                          <span className="font-bold">{pos.name}</span>
                          <span className="text-xs text-gray-400">
                            {pos.description}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="space-y-3">
          <Label>기술 스택 / 분야</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-gray-800 border-gray-600 hover:bg-gray-700 hover:text-white"
              >
                {selectedStackIds.length > 0
                  ? `${selectedStackIds.length}개 선택됨`
                  : "스택을 선택하세요..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-0 bg-gray-900 border-gray-700 text-white">
              <Command>
                <CommandInput
                  placeholder="스택 검색..."
                  className="text-white"
                />
                <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                <CommandGroup>
                  {ALL_STACKS.map((stack) => (
                    <CommandItem
                      key={stack.id}
                      value={stack.label}
                      onSelect={() => handleSelectStack(stack.id)}
                      className="aria-selected:bg-gray-700"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedStackIds.includes(stack.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {stack.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-gray-700 rounded-md">
            {selectedStackIds.map((stackId) => {
              const stack = ALL_STACKS.find((s) => s.id === stackId);
              return (
                <Badge
                  key={stackId}
                  variant="secondary"
                  className="flex items-center gap-x-1 bg-lime-400 text-black"
                >
                  <span>{stack?.label}</span>
                  <button
                    onClick={() => handleRemoveStack(stackId)}
                    className="rounded-full hover:bg-black/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <Label>관심 분야</Label>
          <div className="grid grid-cols-4 gap-2">
            {INTEREST_TOPICS.map((topic) => (
              <Button
                key={topic.id}
                variant="outline"
                onClick={() => handleInterestToggle(topic.id)}
                className={cn(
                  "rounded-md border-gray-600 bg-transparent hover:bg-gray-800 hover:text-white",
                  selectedInterestIds.includes(topic.id) &&
                    "border-lime-400 text-lime-400 border-2"
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
          className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold text-lg py-6"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
