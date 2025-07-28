import { ProfileSection } from "@/components/common/ProfileSection";
import { ChevronRight } from "lucide-react";

const MENU_ITEMS = [
  { id: "posts", label: "작성한 글" },
  { id: "history", label: "활동 이력" },
  { id: "likes", label: "좋아요 한 글" },
  { id: "bookmarks", label: "북마크" },
];

export const MyPage = () => {
  return (
    <div className="dark text-foreground flex flex-col items-center">
      <ProfileSection isEditable />
      <div className="w-full mt-8 border-t border-brand-surface">
        <ul className="text-white">
          {MENU_ITEMS.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-4 border-b border-brand-surface cursor-pointer">
              <span>{item.label}</span>
              <ChevronRight className="size-5 text-brand-text" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
