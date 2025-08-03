import { useState, useEffect } from "react";
import { X, Check, ChevronsUpDown, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { fetchPositions, fetchStacks } from "@/lib/api";
import type { PositionCategory, Stack } from "@/types/filter";

interface FilteringModalProps {
  onClose: () => void;
}

export const FilteringModal = ({ onClose }: FilteringModalProps) => {
  const [distance, setDistance] = useState([5]);
  const [age, setAge] = useState([35]);
  const [position, setPosition] = useState<number | null>(null);
  const [selectedStackIds, setSelectedStackIds] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [positions, setPositions] = useState<PositionCategory[]>([]);
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadFilterData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [fetchedPositions, fetchedStacks] = await Promise.all([
          fetchPositions(),
          fetchStacks(),
        ]);
        setPositions(fetchedPositions);
        setStacks(fetchedStacks);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFilterData();
  }, []);

  const handleSelectStack = (stackId: number) => {
    setSelectedStackIds((prev) =>
      prev.includes(stackId)
        ? prev.filter((id) => id !== stackId)
        : [...prev, stackId]
    );
  };

  const handleRemoveStack = (stackId: number) => {
    setSelectedStackIds((prev) => prev.filter((id) => id !== stackId));
  };

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-100 z-50">
        <div className="w-[480px] mx-auto bg-brand-background flex items-center justify-center h-full relative text-white">
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-100 z-50">
      <div className="w-[480px] mx-auto bg-brand-background flex flex-col h-full relative text-white">
        <div className="flex justify-between items-center p-4 border-b border-brand-surface">
          <h2 className="text-lg font-bold">조건 설정</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-6" />
          </Button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto space-y-8">
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
          <div className="space-y-3">
            <Label>포지션</Label>
            <Accordion
              type="single"
              collapsible
              className="w-full border rounded-md border-gray-700">
              {positions.map((cat) => (
                <AccordionItem
                  key={cat.category}
                  value={cat.category}
                  className="px-4 border-b-gray-700 last:border-b-0">
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
                          )}>
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

          {/* 기술 스택 */}
          <div className="space-y-3">
            <Label>기술 스택 / 분야</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between bg-gray-800 border-gray-600 hover:bg-gray-700 hover:text-white">
                  {selectedStackIds.length > 0
                    ? `${selectedStackIds.length}개 선택됨`
                    : "스택을 선택하세요..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(480px-2rem)] p-0 bg-gray-900 border-gray-700 text-white">
                <Command>
                  <CommandInput
                    placeholder="스택 검색..."
                    className="text-white"
                  />
                  <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                  <CommandGroup className="max-h-48 overflow-y-auto">
                    {stacks.map((stack) => (
                      <CommandItem
                        key={stack.id}
                        value={stack.label}
                        onSelect={() => handleSelectStack(stack.id)}
                        className="aria-selected:bg-gray-700">
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
                const stack = stacks.find((s) => s.id === stackId);
                return (
                  <Badge
                    key={stackId}
                    variant="secondary"
                    className="flex items-center gap-x-1 bg-lime-400 text-black">
                    <span>{stack?.label}</span>
                    <button
                      onClick={() => handleRemoveStack(stackId)}
                      className="rounded-full hover:bg-black/20">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-brand-surface flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="h-full aspect-square bg-brand-surface hover:bg-brand-surface/90 border-0">
            <RotateCcw className="size-5" />
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-brand-surface hover:bg-brand-surface/90 font-bold text-base py-6">
            적용하기
          </Button>
        </div>
      </div>
    </div>
  );
};
