import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "COMEET" }: HeaderProps) {
  const iconButtonClass = "mx-2 text-white hover:bg-brand-surface hover:text-brand-primary cursor-pointer";

  return (
    <header className="w-full border-b border-brand-surface flex items-center justify-between h-14">
      <div>
        <Button
          variant="ghost"
          onClick={() => { }} // TODO: React Router 연동 후 navigate(-1) 기능 추가
          className={iconButtonClass}
          aria-label="뒤로가기"
        >
          <ArrowLeft />
        </Button>
      </div>

      <div>
        <h1 className="text-white">{title}</h1>
      </div>

      <div>
        <Button
          variant="ghost"
          onClick={() => { }} // TODO: React Router 연동 후 navigate('/search') 기능 연결
          className={iconButtonClass}
          aria-label="검색"
        >
          <Search />
        </Button>
      </div>
    </header>
  );
}