import { ProfileSection } from "@/components/common/ProfileSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DEVELOPER_TABS = [
  { value: "profile", label: "프로필" },
  { value: "posts", label: "작성한 글" },
];

export const DeveloperPage = () => {
  return (
    <div className="dark text-foreground flex flex-col items-center">
      <ProfileSection />
      <Tabs defaultValue="profile" className="w-full mt-8">
        <TabsList className="grid w-full grid-cols-2 bg-brand-background border-b border-brand-surface rounded-none p-0">
          {DEVELOPER_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-brand-text data-[state=active]:text-brand-primary data-[state=active]:border-b-2 data-[state=active]:border-brand-primary rounded-none">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="profile" className="mt-4 text-white p-4">
          <p>프로필 정보가 여기에 표시됩니다.</p>
        </TabsContent>
        <TabsContent value="posts" className="mt-4">
          <p>작성한 글 목록이 여기에 표시됩니다.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
