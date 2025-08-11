import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppTabs } from "@/components/common/AppTabs";
import { ProfileSection } from "@/components/profile/ProfileSection.tsx";
import type { DeveloperTabValue } from "@/constants/profile";
import { DEVELOPER_TABS } from "@/constants/profile";
import Links from "./_components/Links.tsx";
import Profile from "./_components/Profile.tsx";
import Header from "@/components/layout/Header.tsx";
import { ArrowLeft, Heart } from "lucide-react";
import {
  useUserProfile,
  useToggleUserSubscription,
} from "@/hooks/queries/useDevelopers";

export const DeveloperPage = () => {
  const { nickname } = useParams<{ nickname: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DeveloperTabValue>("profile");

  console.log("🔍 Developer Page - nickname:", nickname);

  const {
    data: userProfile,
    isLoading,
    error,
  } = useUserProfile(nickname || "");

  const toggleSubscriptionMutation = useToggleUserSubscription();

  const handleTabChange = (value: DeveloperTabValue) => {
    setActiveTab(value);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleHeartClick = async () => {
    if (!nickname) return;

    try {
      await toggleSubscriptionMutation.mutateAsync(nickname);
    } catch (error) {
      console.error("구독 상태 변경 실패:", error);
      alert("구독 상태 변경에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="dark text-foreground flex flex-col overflow-hidden">
        <Header
          title="COMEET"
          leftIcon={<ArrowLeft />}
          rightIcon={<Heart />}
          onLeftClick={handleBackClick}
        />
        <div className="flex items-center justify-center h-full">
          <div className="text-white">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dark text-foreground flex flex-col overflow-hidden">
        <Header
          title="COMEET"
          leftIcon={<ArrowLeft />}
          rightIcon={<Heart />}
          onLeftClick={handleBackClick}
        />
        <div className="flex items-center justify-center h-full">
          <div className="text-white">
            프로필을 불러오는 중 오류가 발생했습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark text-foreground flex flex-col overflow-hidden">
      <Header
        title="COMEET"
        leftIcon={<ArrowLeft />}
        rightIcon={
          <Heart
            className={
              userProfile?.subscribing
                ? "fill-brand-primary text-brand-primary"
                : ""
            }
          />
        }
        onLeftClick={handleBackClick}
        onRightClick={handleHeartClick}
      />
      <div className="pt-20">
        <ProfileSection profile={userProfile} isEditable={false} />
      </div>
      <div className="p-4 -mx-4 overflow-hidden">
        <AppTabs
          tabs={DEVELOPER_TABS}
          value={activeTab}
          onValueChange={handleTabChange}
          listClassName="grid-cols-2"
          className="w-full mt-8"
        />
        <div className="w-full mt-4 text-white px-4">
          {activeTab === "profile" && <Profile userProfile={userProfile} />}
          {activeTab === "posts" && <Links userProfile={userProfile} />}
        </div>
      </div>
    </div>
  );
};
