import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilteringModalProps {
  onClose: () => void;
}

export const FilteringModal = ({ onClose }: FilteringModalProps) => {
  return (
    <div className="fixed inset-0 bg-slate-100 z-50">
      <div className="w-[480px] mx-auto bg-brand-background flex flex-col h-full relative text-white">
        <div className="flex justify-between items-center p-4 border-b border-brand-surface">
          <h2 className="text-lg font-bold">조건 설정</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-6" />
          </Button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <p>필터링 옵션</p>
        </div>
      </div>
    </div>
  );
};
