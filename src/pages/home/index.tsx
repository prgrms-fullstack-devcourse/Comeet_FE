import { Plus } from "lucide-react";
import type { Post } from "@/types/board";
import { BoardTabs } from "@/components/common/BoardTabs";

const posts: Post[] = [
  {
    id: 1,
    category: "자유",
    title: "오늘 날씨 좋네요!",
    author: "하늘구경",
    date: "2024.07.29",
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    category: "질문",
    title: "리액트 Hook 질문 있습니다.",
    author: "궁금해요",
    date: "2024.07.28",
    likes: 3,
    comments: 2,
  },
  {
    id: 3,
    category: "프로젝트",
    title: "사이드 프로젝트 팀원 구합니다!",
    author: "열정맨",
    date: "2024.07.27",
    likes: 25,
    comments: 18,
  },
];

export const BoardPage = () => {
  return (
    <div className="dark text-foreground">
      <BoardTabs posts={posts} />
      <button className="absolute bottom-20 right-4 bg-brand-primary text-brand-background rounded-full p-4 hover:bg-brand-primary/90">
        <Plus className="size-8" />
      </button>
    </div>
  );
};
