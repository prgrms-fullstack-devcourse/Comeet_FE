import { useNavigate } from "react-router-dom";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { Bell, ChevronRight } from "lucide-react";
import { MENU_ITEMS, type MenuItemId } from "@/constants/my";
import Header from "@/components/layout/Header";
import {
  useMyProfile,
  useSignOut,
  useDeleteAccount,
} from "@/hooks/queries/useMy";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const MyPage = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading, error } = useMyProfile();
  const signOutMutation = useSignOut();
  const deleteAccountMutation = useDeleteAccount();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleMenuItemClick = (menuId: MenuItemId) => {
    console.log(`선택된 메뉴: ${menuId}`);

    switch (menuId) {
      case "posts":
        navigate("/my/posts");
        break;
      case "history":
        navigate("/my/history");
        break;
      case "comments":
        navigate("/my/comments");
        break;
      case "bookmarks":
        navigate("/my/bookmarks");
        break;
      case "logout":
        handleLogout();
        break;
      case "delete":
        setShowDeleteDialog(true);
        break;
      default:
        console.warn(`알 수 없는 메뉴 ID: ${menuId}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutMutation.mutateAsync();
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccountMutation.mutateAsync();
    } catch (error) {
      console.error("계정 삭제 실패:", error);
      alert("계정 삭제에 실패했습니다.");
    }
    setShowDeleteDialog(false);
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
                className={`flex justify-between items-center py-4 border-b border-brand-surface cursor-pointer hover:bg-brand-surface/50 transition-colors px-4 ${
                  (item as any).isDestructive ? "text-red-400" : ""
                }`}>
                <span>{item.label}</span>
                <ChevronRight className="size-5 text-brand-text" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 계정 삭제 확인 모달 */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="w-[90%] rounded-2xl bg-brand-background border-brand-surface text-white dark">
          <AlertDialogHeader>
            <AlertDialogTitle>계정 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든
              데이터가 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-brand-surface border-brand-surface text-white hover:bg-brand-surface/90">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-500 hover:bg-red-600 text-white">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
