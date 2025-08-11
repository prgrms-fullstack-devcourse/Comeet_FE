import { useState } from "react";
import { Settings2, LayoutGrid, List } from "lucide-react";
import { Button } from "../../components/ui/button";
import { FilteringModal } from "./_components/FilteringModal";
import { EXPLORE_TABS, type ExploreTabValue } from "../../constants/explore";
import type {
  Developer,
  NearbyUser,
  NearbyUsersParams,
} from "../../types/developer.types";
import { ListView } from "./_components/layout/ListView";
import { GridView } from "./_components/layout/GridView";
import { AppTabs } from "../../components/common/AppTabs";
import { cn } from "../../lib/utils";
import { useDevelopers } from "../../hooks/queries/useDevelopers";

const transformNearbyUserToDeveloper = (
  user: NearbyUser,
  index: number
): Developer => {
  return {
    id: Date.now() + index + Math.random(),
    nickname: user.nickname,
    distance: user.distance ? `${Math.round(user.distance * 10) / 10}km` : "",
    position: user.position ? user.position.role : "포지션 정보 없음",
    stacks: user.techStack?.map((stack) => stack.value) || [],
    experience: `${user.experience}년`,
    image: user.avatar || "",
    category: "nearby" as const,
  };
};

export const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState<ExploreTabValue>("nearby");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filterParams, setFilterParams] = useState<Partial<NearbyUsersParams>>(
    {}
  );

  const {
    data: developersData = [],
    isLoading: isDevelopersLoading,
    error: developersError,
  } = useDevelopers(
    activeTab,
    true,
    activeTab === "nearby" ? filterParams : undefined
  );

  const isLoading = isDevelopersLoading;
  const error = developersError;

  const developers = (developersData || []).map((user: any, index: number) =>
    transformNearbyUserToDeveloper(user, index)
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFilterSubmit = (params: Partial<NearbyUsersParams>) => {
    console.log("필터링 적용:", params);
    setFilterParams(params);
    closeModal();
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as ExploreTabValue);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">로딩 중...</div>
      </div>
    );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <div className="text-white mb-2">
          개발자 정보를 불러오는 중 오류가 발생했습니다.
        </div>
        <div className="text-red-400 text-sm mb-4">{error.message}</div>
        {error.message.includes("인증") && (
          <div className="text-brand-text text-sm">
            💡 팁: 로그인이 만료되었을 수 있습니다. 다시 로그인해주세요.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <AppTabs
        tabs={EXPLORE_TABS}
        value={activeTab}
        onValueChange={handleTabChange}
        listClassName="grid-cols-3 gap-2"
        className="-mx-4"
      />

      <div className="mt-2">
        <div className="flex justify-between items-center mb-2">
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
          {activeTab === "nearby" && (
            <Button
              variant="ghost"
              onClick={openModal}
              className="text-sm text-brand-text">
              <Settings2 className="size-4" />
              <span>조건 설정</span>
            </Button>
          )}
        </div>

        {viewMode === "list" ? (
          <ListView developers={developers} />
        ) : (
          <GridView developers={developers} />
        )}
      </div>

      {isModalOpen && (
        <FilteringModal onClose={closeModal} onSubmit={handleFilterSubmit} />
      )}
    </div>
  );
};
