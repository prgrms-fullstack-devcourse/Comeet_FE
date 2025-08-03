import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SearchHeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function SearchHeader({
  query,
  onQueryChange,
  onSubmit,
  onBack,
}: SearchHeaderProps) {
  return (
    <header className="flex items-center border-b border-brand-surface h-14 ">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-white hover:bg-brand-surface hover:text-brand-primary cursor-pointer"
        aria-label="뒤로가기">
        <ArrowLeft />
      </Button>

      <form onSubmit={onSubmit} className="flex-1 pr-2">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="검색어 입력"
          className="
            w-full p-2
            bg-brand-surface 
            rounded-md
            text-white 
            placeholder-gray-500
            focus:outline-none 
            focus:ring-1 
            focus:ring-brand-primary
          "
          autoFocus
        />
      </form>
    </header>
  );
}
