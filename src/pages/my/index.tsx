import { ProfileSection } from "@/components/common/ProfileSection";
import { ChevronRight } from "lucide-react";
import { MENU_ITEMS, type MenuItemId } from "@/constants/my";

export const MyPage = () => {
  const handleMenuItemClick = (menuId: MenuItemId) => {
    console.log(`선택된 메뉴: ${menuId}`);
  };

  return (
    <div className="dark text-foreground flex flex-col items-center">
      <ProfileSection isEditable />
      <div className="w-full mt-8 border-t border-brand-surface">
        <ul className="text-white">
          {MENU_ITEMS.map((item) => (
            <li
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              className="flex justify-between items-center py-4 border-b border-brand-surface cursor-pointer hover:bg-brand-surface/50 transition-colors">
              <span>{item.label}</span>
              <ChevronRight className="size-5 text-brand-text" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
