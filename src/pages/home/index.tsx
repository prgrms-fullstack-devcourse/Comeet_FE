import { useState, useEffect } from "react";
import { Bell, Plus, Search } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import type { Post } from "../../types/board.types";
import { fetchPosts } from "../../lib/api";
import { AppTabs } from "../../components/common/AppTabs";
import { AddPostModal } from "./_components/modal/AddPostModal";
import { ListItem } from "./_components/ListItem";
import { BOARD_CATEGORIES, BOARD_CATEGORY_VALUES } from "../../constants/board";
import type { UICategory } from "../../constants/board";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";

export const BoardPage = () => {
  const { category = "all" } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const isValidCategory = (cat: string): cat is UICategory => {
      return (BOARD_CATEGORY_VALUES as readonly string[]).includes(cat);
    };

    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);
      if (isValidCategory(category)) {
        try {
          const fetchedPosts = await fetchPosts(category);
          setPosts(fetchedPosts);
        } catch (err) {
          setError(err as Error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setError(new Error("잘못된 카테고리입니다."));
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [category]);

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

  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  const handlePostSubmit = async (data: {
    title: string;
    content: string;
    boardId: number;
  }) => {
    setIsSubmitting(true);
    try {
      // TODO: API 연동
      console.log("게시글 작성:", data);
      setIsModalOpen(false);
      // 게시글 작성 후 목록 새로고침
      const fetchedPosts = await fetchPosts(category as UICategory);
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("게시글 작성 실패:", err);
      alert("게시글 작성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
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
        <AppTabs
          tabs={BOARD_CATEGORIES}
          value={category}
          onValueChange={handleTabChange}
          listClassName="grid-cols-5 gap-2"
          className="-mx-4"
        />
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
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};
