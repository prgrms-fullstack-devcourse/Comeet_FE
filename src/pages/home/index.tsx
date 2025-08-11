import { useState } from "react";
import { Bell, Plus, Search } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts, useCreatePost, useBoards } from "@/hooks/queries/usePosts";
import { useLocationQuery } from "@/hooks/queries/useLocationQuery";
import { AppTabs } from "@/components/common/AppTabs";
import { AddPostModal } from "./_components/modal/AddPostModal";
import { ListItem } from "@/components/common/ListItem";
import type { UICategory } from "@/constants/board";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";

export const BoardPage = () => {
  const { category = "all" } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: boards = [], isLoading: boardsLoading } = useBoards();
  const { refetchLocation } = useLocationQuery();

  const validCategories = [
    "all",
    ...boards.map((board) => board.id.toString()),
  ];
  const currentCategory = validCategories.includes(category) ? category : "all";

  const {
    data: posts = [],
    isLoading: postsLoading,
    error,
  } = usePosts(currentCategory as UICategory);
  const createPostMutation = useCreatePost();

  const boardTabs = [
    { value: "all", label: "전체" },
    ...boards.map((board) => ({
      value: board.id.toString(),
      label: board.value,
    })),
  ];

  const handleTabChange = (value: string) => {
    navigate(`/board/${value}`);
  };

  const handleNotificationClick = () => {
    console.log("알림 클릭");
  };

  const handleSearchClick = () => {
    console.log("검색 클릭");
    navigate("/search");
  };

  const handlePlusClick = async () => {
    try {
      await refetchLocation();
    } catch (error) {
      console.error("위치 정보 가져오기 실패:", error);
    }
    setIsModalOpen(true);
  };

  const handlePostSubmit = async (data: {
    title: string;
    content: string;
    boardId: number;
    location: { lat: number; lng: number };
  }) => {
    try {
      await createPostMutation.mutateAsync(data);
      setIsModalOpen(false);
    } catch (err) {
      alert("게시글 작성에 실패했습니다.");
    }
  };

  if (boardsLoading || postsLoading)
    return <div className="p-4 text-white text-center">로딩 중...</div>;
  if (error)
    return (
      <div className="p-4 text-white text-center">
        에러 발생: {error.message}
      </div>
    );

  return (
    <div className="dark text-foreground h-full flex flex-col">
      <Header
        title="COMEET"
        leftIcon={<Bell />}
        rightIcon={<Search />}
        onLeftClick={handleNotificationClick}
        onRightClick={handleSearchClick}
      />
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        <div className="pt-12">
          <AppTabs
            tabs={boardTabs}
            value={currentCategory}
            onValueChange={handleTabChange}
            listClassName="grid-cols-5 gap-2"
            className="-mx-4"
          />
        </div>
        <div className="mt-4 space-y-4">
          {posts.map((post) => (
            <ListItem key={post.id} post={post} />
          ))}
        </div>
        <Button
          size="icon"
          onClick={handlePlusClick}
          className="absolute bottom-20 right-4 rounded-full w-16 h-16 bg-brand-primary text-brand-background hover:bg-brand-primary/90">
          <Plus className="size-8" />
        </Button>
      </div>

      {isModalOpen && (
        <AddPostModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePostSubmit}
          isSubmitting={createPostMutation.isPending}
        />
      )}
    </div>
  );
};
