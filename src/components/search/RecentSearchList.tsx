import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RecentSearchListProps {
  searches: string[];
  onSearchClick: (search: string) => void;
  onRemove: (index: number) => void;
}

export default function RecentSearchList({
  searches,
  onSearchClick,
  onRemove
}: RecentSearchListProps) {
  if (searches.length === 0) {
    return (
      <div className="text-center py-12 text-brand-text">
        <p>최근 검색 기록이 없습니다</p>
      </div>
    );
  }

  return (
    <>
      {searches.map((search, index) => (
        <div key={search} className="flex items-center justify-between">
          <button
            onClick={() => onSearchClick(search)}
            className="text-white hover:text-brand-primary cursor-pointer"
            aria-label={`"${search}" 검색하기`}
          >
            {search}
          </button>

          <Button
            variant="ghost"
            onClick={() => onRemove(index)}
            className="text-white hover:text-brand-primary hover:bg-brand-surface cursor-pointer"
            aria-label="최근 검색 삭제"
          >
            <X />
          </Button>
        </div>
      ))}
    </>
  );
}
