import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ListItem } from "./ListItem";
import type { Post } from "@/types/board";
import { BOARD_CATEGORIES } from "@/constants/board";

interface BoardTabsProps {
  posts: Post[];
  currentCategory: string;
}

export const BoardTabs = ({ posts, currentCategory }: BoardTabsProps) => {
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    navigate(`/board/${value}`);
  };

  return (
    <Tabs
      value={currentCategory}
      onValueChange={handleTabChange}
      className="w-full">
      <TabsList className="grid w-full grid-cols-5 gap-2 bg-brand-background rounded-none p-0">
        {BOARD_CATEGORIES.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-full border-brand-surface text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-brand-primary data-[state=active]:border-2 data-[state=active]:border-brand-primary">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={currentCategory} className="mt-4">
        <div className="space-y-4">
          {posts.map((post) => (
            <ListItem key={post.id} post={post} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
