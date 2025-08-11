import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import { useMyPosts } from "@/hooks/queries/useMy";
import { ListItem } from "@/components/common/ListItem";

export const MyPostsPage = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading, error } = useMyPosts();

  const handleBack = () => {
    navigate("/my");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-background text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p>게시물을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-background text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">게시물을 불러올 수 없습니다.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-brand-primary text-black rounded-lg hover:bg-brand-primary/90">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="작성한 글"
        leftIcon={<ArrowLeft />}
        onLeftClick={handleBack}
      />
      <div className="dark text-foreground pt-20 pb-20">
        <div className="px-4">
          {posts && posts.length > 0 ? (
            <div className="space-y-4">
              {posts
                .sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((post: any) => (
                  <ListItem key={post.id} post={post} />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-brand-text">작성한 게시물이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
