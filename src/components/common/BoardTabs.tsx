import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListItem } from "./ListItem";
import type { Post } from "@/types/board";

interface BoardTabsProps {
  posts: Post[];
}

const TABS = [
  { value: "all", label: "전체" },
  { value: "free", label: "자유" },
  { value: "qna", label: "질문" },
  { value: "project", label: "프로젝트" },
  { value: "study", label: "모각코" },
];

export const BoardTabs = ({ posts }: BoardTabsProps) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-5 gap-2 bg-brand-background rounded-none p-0">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-full  border-brand-surface data-[state=active]:!bg-transparent data-[state=active]:!text-brand-primary data-[state=active]:!border-2 data-[state=active]:!border-brand-primary">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          <div className="space-y-4">
            {posts
              .filter(
                (post) => tab.value === "all" || post.category === tab.label
              )
              .map((post) => (
                <ListItem key={post.id} post={post} />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
