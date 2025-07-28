import { useState } from "react";
import { AppTabs } from "@/components/common/AppTabs";
import { ProfileSection } from "@/components/common/ProfileSection";
import type { DeveloperTabValue } from "@/constants/profile";
import { DEVELOPER_TABS } from "@/constants/profile";
import Posts from "./_components/Posts.tsx";
import Profile from "./_components/Profile.tsx";

export const DeveloperPage = () => {
  const [activeTab, setActiveTab] = useState<DeveloperTabValue>("profile");

  const handleTabChange = (value: string) => {
    setActiveTab(value as DeveloperTabValue);
  };

  return (
    <div className="dark text-foreground flex flex-col items-center">
      <ProfileSection />
      <AppTabs
        tabs={DEVELOPER_TABS}
        value={activeTab}
        onValueChange={handleTabChange}
        listClassName="grid-cols-2"
        className="w-full mt-8"
      />
      <div className="w-full mt-4 p-4 text-white">
        {activeTab === "profile" && <Profile />}
        {activeTab === "posts" && <Posts />}
      </div>
    </div>
  );
};
