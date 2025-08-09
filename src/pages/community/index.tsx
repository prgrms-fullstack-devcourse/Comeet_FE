import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { ArrowLeft, Bookmark, Heart, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { usePostDetail, useComments } from "@/hooks/queries/usePosts";
import { CommentForm } from "./__components/CommentForm";
import { CommentSection } from "./__components/CommentSection";
import { formatPostDetailDate } from "@/lib/date";

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  if (!postId) {
    return <div className="p-4 text-white">유효하지 않은 게시글 ID입니다.</div>;
  }

  const { data: post, isLoading, isError, error } = usePostDetail(postId);
  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useComments(postId);

  if (isLoading) {
    return <div className="p-4 text-white">로딩 중...</div>;
  }
  if (isError) {
    return <div className="p-4 text-white">에러 발생: {error?.message}</div>;
  }
  if (!post) {
    return <div className="p-4 text-white">게시글이 없습니다.</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBookmarkClick = () => {
    console.log("북마크 클릭");
  };

  return (
    <div className="dark text-foreground h-full flex flex-col">
      <Header
        title="COMEET"
        leftIcon={<ArrowLeft />}
        rightIcon={<Bookmark />}
        onLeftClick={handleBackClick}
        onRightClick={handleBookmarkClick}
      />
      <div className="flex-1 overflow-y-auto scrollbar-hide pt-16">
        <main className="w-full flex flex-col text-white">
          <div className="p-4 flex flex-col gap-y-4">
            <Badge
              variant="outline"
              className="w-fit border-brand-primary text-brand-primary">
              {post.board.value}
            </Badge>
            <h2 className="text-xl font-bold">{post.title}</h2>
            <div className="flex items-center gap-x-2 text-xs text-brand-text">
              <span>{post.author.nickname}</span>
              <span>•</span>
              <span>{formatPostDetailDate(post.createdAt)}</span>
            </div>
          </div>

          <Separator className="w-full bg-brand-surface" />

          <div className="p-4 flex flex-col">
            <div className="min-h-[200px] text-sm leading-relaxed mb-4 whitespace-pre-wrap break-words">
              {post.content ? (
                <>{post.content}</>
              ) : (
                <p className="text-brand-text">
                  게시글 내용은 현재 API에서 제공되지 않습니다.
                </p>
              )}
            </div>

            <div className="flex items-center gap-x-6 text-brand-text">
              <div className="flex items-center gap-x-2">
                <Heart className="size-4" />
                <span>{post.nLikes}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <MessageCircle className="size-4" />
                <span>{post.nComments}</span>
              </div>
            </div>
          </div>
          <Separator className="bg-brand-surface !h-1" />

          {isCommentsLoading ? (
            <div className="p-4 text-center text-brand-text">
              댓글을 불러오는 중...
            </div>
          ) : isCommentsError ? (
            <div className="p-4 text-center text-red-500">
              댓글을 불러오는 데 실패했습니다.
            </div>
          ) : (
            <CommentSection
              comments={comments}
              onToggleCommentLike={() => {}}
              onToggleReplyLike={() => {}}
            />
          )}
          <div className="h-20"></div>
        </main>
      </div>

      <div className="border-t border-brand-surface bg-brand-background">
        <CommentForm onSubmit={() => {}} isPending={false} />
      </div>
    </div>
  );
}
