import { useState } from "react";
import { Settings2, LayoutGrid, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FilteringModal } from "./_components/FilteringModal";
import { EXPLORE_TABS } from "@/constants/explore";
import type { Developer } from "@/types/developer";
import { cn } from "@/lib/utils";
import { ListView } from "./_components/layout/ListView";
import { GridView } from "./_components/layout/GridView";

// 가짜 데이터
const FAKE_DEVELOPERS: Developer[] = [
  {
    id: 1,
    nickname: "주변 개발자 1",
    distance: "1km",
    position: "프론트엔드 개발자",
    skills: ["React", "TypeScript"],
    experience: "3년차",
    image: "",
    category: "nearby",
  },
  {
    id: 2,
    nickname: "인기 개발자 1",
    distance: "10km",
    position: "백엔드 개발자",
    skills: ["Node.js", "NestJS"],
    experience: "5년차",
    image: "",
    category: "popular",
  },
  {
    id: 3,
    nickname: "관심 개발자 1",
    distance: "5km",
    position: "풀스택 개발자",
    skills: ["React", "Node.js"],
    experience: "1년차",
    image: "",
    category: "favorite",
  },
  {
    id: 4,
    nickname: "주변 개발자 2",
    distance: "500m",
    position: "iOS 개발자",
    skills: ["Swift", "SwiftUI"],
    experience: "2년차",
    image: "",
    category: "nearby",
  },
  {
    id: 5,
    nickname: "인기 개발자 2",
    distance: "25km",
    position: "데브옵스 엔지니어",
    skills: ["Docker", "Kubernetes", "AWS"],
    experience: "7년차",
    image: "",
    category: "popular",
  },
];

export const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState<string>("nearby");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const filteredDevelopers = FAKE_DEVELOPERS.filter(
    (dev) => dev.category === activeTab
  );

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-brand-background rounded-none p-0">
          {EXPLORE_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-0 border-b-2 border-transparent text-muted-foreground data-[state=active]:border-brand-primary data-[state=active]:text-brand-primary">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={cn(
                "text-brand-text hover:text-brand-primary",
                viewMode === "grid" && "text-brand-primary"
              )}>
              <LayoutGrid className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={cn(
                "text-brand-text hover:text-brand-primary",
                viewMode === "list" && "text-brand-primary"
              )}>
              <List className="size-5" />
            </Button>
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-1 text-sm text-brand-text">
            <Settings2 className="size-4" />
            <span>조건 설정</span>
          </button>
        </div>

        {viewMode === "list" ? (
          <ListView developers={filteredDevelopers} />
        ) : (
          <GridView developers={filteredDevelopers} />
        )}
      </div>

      {isModalOpen && <FilteringModal onClose={closeModal} />}
    </div>
  );
};
