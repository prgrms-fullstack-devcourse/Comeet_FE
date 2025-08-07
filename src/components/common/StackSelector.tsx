import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { fetchStacks } from "@/lib/api";
import type { Stack } from "@/types/filter.types";

interface StackSelectorProps {
  selectedStackIds: number[];
  onStackChange: (stackIds: number[]) => void;
  label?: string;
  maxSelection?: number;
}

export const StackSelector = ({
  selectedStackIds,
  onStackChange,
  label = "기술 스택 / 분야",
  maxSelection,
}: StackSelectorProps) => {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStacks = async () => {
      try {
        const fetchedStacks = await fetchStacks();
        setStacks(fetchedStacks);
      } catch (error) {
        console.error("스택 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStacks();
  }, []);

  const handleSelectStack = (stackId: number) => {
    const newStackIds = selectedStackIds.includes(stackId)
      ? selectedStackIds.filter((id) => id !== stackId)
      : maxSelection && selectedStackIds.length >= maxSelection
      ? selectedStackIds
      : [...selectedStackIds, stackId];

    onStackChange(newStackIds);
    setOpen(false);
  };

  const handleRemoveStack = (stackIdToRemove: number) => {
    const newStackIds = selectedStackIds.filter((id) => id !== stackIdToRemove);
    onStackChange(newStackIds);
  };

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-brand-surface border-transparent hover:bg-brand-primary hover:text-white">
            {selectedStackIds.length > 0
              ? `${selectedStackIds.length}개 선택됨`
              : "스택을 선택하세요..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={4}
          avoidCollisions={true}
          className="w-[var(--radix-popover-trigger-width)] p-0 border-transparent z-[9999] bg-brand-surface max-h-[200px] overflow-y-auto scrollbar-hide">
          <Command className="bg-brand-surface text-white">
            <CommandInput placeholder="스택 검색..." />
            <CommandEmpty className="text-white">
              검색 결과가 없습니다.
            </CommandEmpty>
            <CommandGroup className="bg-brand-surface ">
              {stacks.map((stack) => (
                <CommandItem
                  key={stack.id}
                  value={stack.label}
                  onSelect={() => handleSelectStack(stack.id)}
                  className="aria-selected:bg-brand-primary text-white">
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
      <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-brand-surface rounded-md">
        {selectedStackIds.length > 0 ? (
          selectedStackIds.map((stackId) => {
            const stack = stacks.find((s) => s.id === stackId);
            return (
              <Badge
                key={stackId}
                variant="secondary"
                className="flex items-center gap-x-1 bg-brand-primary text-black">
                <span>{stack?.label}</span>
                <button
                  onClick={() => handleRemoveStack(stackId)}
                  className="rounded-full hover:bg-black/20">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })
        ) : (
          <span className="text-brand-text">기술 스택을 선택해주세요</span>
        )}
      </div>
    </div>
  );
};
