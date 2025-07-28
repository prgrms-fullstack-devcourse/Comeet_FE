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
    if (DEVELOPER_TABS.some((tab) => tab.value === value)) {
      setActiveTab(value as DeveloperTabValue);
    }
  };

  return (
    <div className="dark text-foreground flex flex-col -mx-4">
      <div className="px-4">
        <ProfileSection />
      </div>
      <AppTabs
        tabs={DEVELOPER_TABS}
        value={activeTab}
        onValueChange={handleTabChange}
        listClassName="grid-cols-2"
        className="w-full mt-8"
      />
      <div className="w-full mt-4 text-white px-4">
        {activeTab === "profile" && <Profile />}
        {activeTab === "posts" && <Posts />}
      </div>
    </div>
  );
};
