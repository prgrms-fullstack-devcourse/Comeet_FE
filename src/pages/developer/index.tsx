import { useState } from "react";
import { AppTabs } from "@/components/common/AppTabs";
import { ProfileSection } from "@/components/profile/ProfileSection.tsx";
import type { DeveloperTabValue } from "@/constants/profile";
import { DEVELOPER_TABS } from "@/constants/profile";
import Posts from "./_components/Posts.tsx";
import Profile from "./_components/Profile.tsx";
import Header from "@/components/layout/Header.tsx";
import { ArrowLeft, Heart } from "lucide-react";

export const DeveloperPage = () => {
  const [activeTab, setActiveTab] = useState<DeveloperTabValue>("profile");

  const handleTabChange = (value: DeveloperTabValue) => {
    setActiveTab(value);
  };

  return (
    <div className="dark text-foreground flex flex-col  ">
      <Header title="COMEET" leftIcon={<ArrowLeft />} rightIcon={<Heart />} />
      <div>
        <ProfileSection />
      </div>
      <div className="p-4 -mx-4">
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
    </div>
  );
};
