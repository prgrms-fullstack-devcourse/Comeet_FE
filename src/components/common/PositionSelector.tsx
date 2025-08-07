import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { fetchPositions } from "@/lib/api";
import type { PositionCategory } from "@/types/filter.types";

interface PositionSelectorProps {
  selectedPosition: number | null;
  onPositionChange: (positionId: number) => void;
  label?: string;
}

export const PositionSelector = ({
  selectedPosition,
  onPositionChange,
  label = "포지션",
}: PositionSelectorProps) => {
  const [positions, setPositions] = useState<PositionCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPositions = async () => {
      try {
        const fetchedPositions = await fetchPositions();
        setPositions(fetchedPositions);
      } catch (error) {
        console.error("포지션 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPositions();
  }, []);

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md border-brand-surface">
        {positions.map((cat) => (
          <AccordionItem
            key={cat.category}
            value={cat.category}
            className="px-4 border-b-brand-surface last:border-b-0">
            <AccordionTrigger className="hover:no-underline">
              {cat.category}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 pt-2">
                {cat.positions.map((pos) => (
                  <Button
                    key={pos.id}
                    variant="outline"
                    onClick={() => onPositionChange(pos.id)}
                    className={cn(
                      "h-auto justify-start text-left whitespace-normal border-transparent bg-brand-surface",
                      selectedPosition === pos.id &&
                        "border-brand-primary text-brand-primary border-1"
                    )}>
                    <div className="flex flex-col">
                      <span className="font-bold">{pos.name}</span>
                      <span className="text-xs text-brand-text">
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
  );
};
