import { useState, useEffect } from "react";
import { Settings2, LayoutGrid, List } from "lucide-react";
import { Button } from "../../components/ui/button";
import { FilteringModal } from "./_components/FilteringModal";
import { EXPLORE_TABS, type ExploreTabValue } from "../../constants/explore";
import type { Developer } from "../../types/developer";
import { ListView } from "./_components/layout/ListView";
import { GridView } from "./_components/layout/GridView";
import { AppTabs } from "../../components/common/AppTabs";
import { cn } from "../../lib/utils";
import { fetchDevelopers } from "../../lib/api";

export const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState<ExploreTabValue>("nearby");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadDevelopers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedDevelopers = await fetchDevelopers(activeTab);
        setDevelopers(fetchedDevelopers);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDevelopers();
  }, [activeTab]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value as ExploreTabValue);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      <AppTabs
        tabs={EXPLORE_TABS}
        value={activeTab}
        onValueChange={handleTabChange}
        listClassName="grid-cols-3 gap-2"
        className="-mx-4"
      />

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
          <Button
            variant="ghost"
            onClick={openModal}
            className="text-sm text-brand-text">
            <Settings2 className="size-4" />
            <span>조건 설정</span>
          </Button>
        </div>

        {viewMode === "list" ? (
          <ListView developers={developers} />
        ) : (
          <GridView developers={developers} />
        )}
      </div>

      {isModalOpen && <FilteringModal onClose={closeModal} />}
    </div>
  );
};
