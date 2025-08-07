import { useState, useMemo, useEffect } from "react";
import type { OnboardingData } from "@/pages/onboarding/OnboardingPage";
import { usePositionsAndInterests, useTechSearch } from "@/hooks/useTags";
import type { PositionDTO, TypeDTO } from "@/hooks/useTags";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, X, Frown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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

const RECOMMENDED_STACKS = [
  { id: 1, value: "React", label: "React" },
  { id: 2, value: "TypeScript", label: "TypeScript" },
  { id: 3, value: "JavaScript", label: "JavaScript" },
  { id: 4, value: "Next.js", label: "Next.js" },
  { id: 6, value: "Java", label: "Java" },
  { id: 7, value: "Spring", label: "Spring" },
  { id: 8, value: "Python", label: "Python" },
  { id: 11, value: "NestJS", label: "NestJS" },
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
  const [open, setOpen] = useState(false);

  const [techSearchKeyword, setTechSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce(techSearchKeyword, 300);
  const { data: techResults, isFetching: isFetchingTechs } = useTechSearch(
    debouncedSearchKeyword
  );

  const [selectedTechs, setSelectedTechs] = useState<Map<number, string>>(
    () =>
      new Map(
        data.techStack?.map((id) => {
          const stack = RECOMMENDED_STACKS.find((s) => s.id === id);
          return [id, stack?.label || ""];
        }) || []
      )
  );

  const [selectedInterestIds, setSelectedInterestIds] = useState<number[]>(
    data.interests || []
  );

  const positionGroups = useMemo(() => {
    if (!tagsData) return {};
    return tagsData.positions.reduce(
      (acc: Record<string, PositionDTO[]>, pos: PositionDTO) => {
        (acc[pos.field] = acc[pos.field] || []).push(pos);
        return acc;
      },
      {}
    );
  }, [tagsData]);

  useEffect(() => {
    if (!techResults) return;

    const newSelectedTechs = new Map(selectedTechs);
    let isChanged = false;

    newSelectedTechs.forEach((value, id) => {
      if (!value) {
        const foundTech = techResults.find((tech) => tech.id === id);
        if (foundTech) {
          newSelectedTechs.set(id, foundTech.value);
          isChanged = true;
        }
      }
    });

    if (isChanged) {
      setSelectedTechs(newSelectedTechs);
    }
  }, [techResults]);

  const customFilter = (value: string, search: string): number => {
    return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
  };

  const handleSelectStack = (techId: number, techValue: string) => {
    const newSelectedTechs = new Map(selectedTechs);
    if (newSelectedTechs.has(techId)) {
      newSelectedTechs.delete(techId);
    } else {
      newSelectedTechs.set(techId, techValue);
    }
    setSelectedTechs(newSelectedTechs);
    setOpen(false);
  };
  const handleRemoveStack = (stackIdToRemove: number) => {
    const newSelectedTechs = new Map(selectedTechs);
    newSelectedTechs.delete(stackIdToRemove);
    setSelectedTechs(newSelectedTechs);
  };

  const handleInterestToggle = (topicId: number) => {
    const newInterestIds = selectedInterestIds.includes(topicId)
      ? selectedInterestIds.filter((id) => id !== topicId)
      : [...selectedInterestIds, topicId];
    setSelectedInterestIds(newInterestIds);
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
      position: position,
      techStack: Array.from(selectedTechs.keys()),
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
            disabled={isLoadingTags || isError}
          >
            {isLoadingTags && (
              <div className="p-4 text-gray-400">
                포지션 목록을 불러오는 중...
              </div>
            )}
            {isError && (
              <div className="p-4 text-red-500 flex items-center gap-2">
                <Frown size={18} /> {error.message}
              </div>
            )}
            {!isLoadingTags &&
              !isError &&
              Object.entries(positionGroups).map(([field, positions]) => (
                <AccordionItem
                  key={field}
                  value={field}
                  className="px-4 border-b-gray-700 last:border-b-0"
                >
                  <AccordionTrigger className="hover:no-underline">
                    {field}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 pt-2">
                      {positions.map((pos: PositionDTO) => (
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
                          <span className="font-bold">{pos.role}</span>
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
                {selectedTechs.size > 0
                  ? `${selectedTechs.size}개 선택됨`
                  : "스택을 검색하여 추가하세요..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-0 bg-gray-900 border-gray-700 text-white">
              <Command filter={customFilter}>
                <CommandInput
                  placeholder="스택 검색..."
                  onValueChange={setTechSearchKeyword}
                  className="text-black"
                />
                <CommandList>
                  {isFetchingTechs && (
                    <div className="p-2 text-sm text-gray-400">검색 중...</div>
                  )}

                  {!debouncedSearchKeyword && !isFetchingTechs && (
                    <CommandGroup heading="추천 스택">
                      {RECOMMENDED_STACKS.map((stack) => (
                        <CommandItem
                          key={stack.id}
                          value={stack.label}
                          onSelect={() =>
                            handleSelectStack(stack.id, stack.label)
                          }
                          className="aria-selected:bg-gray-700"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedTechs.has(stack.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {stack.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {!isFetchingTechs &&
                    debouncedSearchKeyword &&
                    techResults?.length === 0 && (
                      <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                    )}

                  {debouncedSearchKeyword && (
                    <CommandGroup heading="검색 결과">
                      {techResults?.map((tech: TypeDTO) => (
                        <CommandItem
                          key={tech.id}
                          value={tech.value}
                          onSelect={() =>
                            handleSelectStack(tech.id, tech.value)
                          }
                          className="aria-selected:bg-gray-700"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedTechs.has(tech.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {tech.value}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-gray-700 rounded-md">
            {Array.from(selectedTechs.entries()).map(([id, value]) => (
              <Badge
                key={id}
                variant="secondary"
                className="flex items-center gap-x-1 bg-lime-400 text-black"
              >
                <span>{value || `(이름 확인 중...)`}</span>
                <button
                  onClick={() => handleRemoveStack(id)}
                  className="rounded-full hover:bg-black/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>관심 분야</Label>
          <div className="grid grid-cols-4 gap-2">
            {isLoadingTags &&
              Array.from({ length: 8 }).map((_, i) => (
                <Button
                  key={i}
                  disabled
                  className="bg-gray-800 border-gray-700 h-9"
                ></Button>
              ))}
            {isError && (
              <div className="col-span-4 p-4 text-red-500 flex items-center gap-2">
                <Frown size={18} /> 데이터 로딩 실패
              </div>
            )}
            {tagsData?.interests.map((topic: TypeDTO) => (
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
                {topic.value}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={isLoadingTags}
          className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold text-lg py-6 disabled:bg-gray-500"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
