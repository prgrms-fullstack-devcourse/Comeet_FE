import { useNavigate } from "react-router-dom";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { Bell, ChevronRight } from "lucide-react";
import { MENU_ITEMS, type MenuItemId } from "@/constants/my";
import Header from "@/components/layout/Header";
import { useMyProfile } from "@/hooks/queries/useMy";

export const MyPage = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading, error } = useMyProfile();

  const handleMenuItemClick = (menuId: MenuItemId) => {
    console.log(`선택된 메뉴: ${menuId}`);
  };

  const handleEditProfile = () => {
    navigate("/my/edit");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-background text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p>프로필을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-background text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">프로필을 불러올 수 없습니다.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-brand-primary text-black rounded-lg hover:bg-brand-primary/90">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="COMEET" leftIcon={<Bell />} />
      <div className="dark text-foreground flex flex-col items-center pt-20">
        <ProfileSection
          profile={profile}
          isEditable
          onEditClick={handleEditProfile}
        />
        <div className="w-full mt-8 border-t border-brand-surface">
          <ul className="text-white">
            {MENU_ITEMS.map((item) => (
              <li
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className="flex justify-between items-center py-4 border-b border-brand-surface cursor-pointer hover:bg-brand-surface/50 transition-colors px-4">
                <span>{item.label}</span>
                <ChevronRight className="size-5 text-brand-text" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
