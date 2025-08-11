import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { usePositionsInterests } from "@/hooks/queries/useTags";
import type { Position } from "@/types/tags.types";

interface PositionSelectorProps {
  selectedPosition: number | null;
  selectedPositionIds?: number[];
  onPositionChange: (positionId: number) => void;
  onPositionIdsChange?: (positionIds: number[]) => void;
  label?: string;
  multiple?: boolean;
}

export const PositionSelector = ({
  selectedPosition,
  selectedPositionIds = [],
  onPositionChange,
  onPositionIdsChange,
  label = "포지션",
  multiple = false,
}: PositionSelectorProps) => {
  const { data: positionsInterestsData, isLoading } = usePositionsInterests();

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (!positionsInterestsData?.positions) {
    return <div className="text-center">포지션을 불러올 수 없습니다.</div>;
  }

  const positions = positionsInterestsData.positions;

  // positions를 field별로 그룹화
  const groupedPositions = positions.reduce((acc, position) => {
    if (!acc[position.field]) {
      acc[position.field] = [];
    }
    acc[position.field].push(position);
    return acc;
  }, {} as Record<string, Position[]>);

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md border-brand-surface">
        {Object.entries(groupedPositions).map(([field, fieldPositions]) => (
          <AccordionItem
            key={field}
            value={field}
            className="px-4 border-b-brand-surface last:border-b-0">
            <AccordionTrigger className="hover:no-underline">
              {field}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 pt-2">
                {fieldPositions.map((position) => {
                  const isSelected = multiple
                    ? selectedPositionIds.includes(position.id)
                    : selectedPosition === position.id;

                  const handleClick = () => {
                    if (multiple && onPositionIdsChange) {
                      const newPositionIds = isSelected
                        ? selectedPositionIds.filter((id) => id !== position.id)
                        : [...selectedPositionIds, position.id];
                      onPositionIdsChange(newPositionIds);
                    } else {
                      onPositionChange(position.id);
                    }
                  };

                  return (
                    <Button
                      key={position.id}
                      variant="outline"
                      onClick={handleClick}
                      className={cn(
                        "h-auto justify-start text-left whitespace-normal border-transparent bg-brand-surface",
                        isSelected &&
                          "border-brand-primary text-brand-primary border-1"
                      )}>
                      <div className="flex flex-col">
                        <span className="font-bold">{position.role}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
