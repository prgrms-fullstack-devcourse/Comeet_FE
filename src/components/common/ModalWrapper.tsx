import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface ModalWrapperProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export const ModalWrapper = ({
  title,
  onClose,
  children,
  footer,
}: ModalWrapperProps) => {
  return (
    <div className="fixed inset-0 z-50">
      <div className="w-full mx-auto bg-brand-background flex flex-col relative text-white h-screen">
        <div className="flex justify-between items-center py-2 px-4 border-b border-brand-surface">
          <h2 className="text-lg font-bold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="-mr-4 size-6" />
          </Button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">{children}</div>
        {footer && (
          <div className="py-2 px-4 border-t border-brand-surface">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
