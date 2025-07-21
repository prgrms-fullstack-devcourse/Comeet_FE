import { NAV_ITEMS } from '@/constants/navigation';
import { Button } from '../ui/button';

export default function BottomNavigation() {
  return (
    <nav className="w-full border-t border-brand-surface h-14 flex">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => { }}
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