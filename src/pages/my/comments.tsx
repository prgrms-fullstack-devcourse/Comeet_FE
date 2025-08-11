import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import { useMyComments } from "@/hooks/queries/useMy";
import { formatRelativeTime } from "@/lib/date";

export const MyCommentsPage = () => {
  const navigate = useNavigate();
  const { data: comments, isLoading, error } = useMyComments();

  const handleBack = () => {
    navigate("/my");
  };

  const handlePostClick = (postId: number) => {
    navigate(`/community/${postId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-background text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p>댓글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-background text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">댓글을 불러올 수 없습니다.</p>
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
        title="내가 쓴 댓글"
        leftIcon={<ArrowLeft />}
        onLeftClick={handleBack}
      />
      <div className="dark text-foreground pt-20 pb-20">
        <div className="px-4">
          {comments && comments.length > 0 ? (
            <div className="space-y-4">
              {comments
                .sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((comment: any) => (
                  <div
                    key={comment.id}
                    onClick={() => handlePostClick(comment.postId)}
                    className="bg-brand-surface rounded-lg p-4 cursor-pointer hover:bg-brand-surface/80 transition-colors">
                    <p className="text-white text-sm mb-2 line-clamp-3">
                      {comment.content}
                    </p>

                    <div className="flex items-center justify-between text-brand-text text-xs">
                      <span>{formatRelativeTime(comment.createdAt)}</span>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="size-3" />
                        <span>본문으로 이동</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-brand-text">작성한 댓글이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
