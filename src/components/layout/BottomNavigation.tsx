import { NAV_ITEMS } from '@/constants/navigation';
import { Button } from '../ui/button';

export default function BottomNavigation() {
  return (
    <nav className="w-full border-t border-brand-surface h-14 flex">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        // TODO: useLocation 훅 추가 후 실제 현재 경로와 비교하도록 수정 필요
        const isActive = location.pathname === item.path;

        return (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => { }} // TODO: 각 페이지(홈/주변탐색/채팅/프로필) 구현 완료 후 navigate(item.path) 기능 추가
            className={`
              flex-1 
              h-full 
              rounded-none 
              hover:text-brand-primary 
              hover:bg-brand-surface 
              cursor-pointer
              ${isActive ? 'text-brand-primary' : 'text-white'}
            `}
            aria-label={`${item.id} 페이지로 이동`}
          >
            <Icon />
          </Button>
        );
      })}
    </nav>
  );
}