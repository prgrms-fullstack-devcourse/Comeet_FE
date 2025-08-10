import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { ArrowLeft, Bookmark, Heart, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  usePostDetail,
  useComments,
  useToggleLike,
  useToggleBookmark,
  useCreateComment,
} from "@/hooks/queries/usePosts";
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

  const toggleLikeMutation = useToggleLike();
  const toggleBookmarkMutation = useToggleBookmark();
  const createCommentMutation = useCreateComment();

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

  const handleLikeClick = async () => {
    if (!post) return;
    try {
      await toggleLikeMutation.mutateAsync(post.id);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  const handleBookmarkClick = async () => {
    if (!post) return;
    try {
      await toggleBookmarkMutation.mutateAsync(post.id);
    } catch (error) {
      console.error("북마크 처리 실패:", error);
    }
  };

  const handleCommentSubmit = async (content: string) => {
    if (!postId) return;
    try {
      await createCommentMutation.mutateAsync({ postId, content });
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="dark text-foreground h-full flex flex-col">
      <Header
        title="COMEET"
        leftIcon={<ArrowLeft />}
        rightIcon={
          <Bookmark
            className={
              post.bookmark ? "fill-brand-primary text-brand-primary" : ""
            }
          />
        }
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
                <p className="text-brand-text">게시글 내용이 없습니다.</p>
              )}
            </div>

            <div className="flex items-center gap-x-3 text-brand-text">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto flex items-center gap-x-2"
                onClick={handleLikeClick}
                disabled={toggleLikeMutation.isPending}>
                <Heart
                  className="size-4"
                  fill={post.likeIt ? "#FF4A4A" : "none"}
                  stroke={post.likeIt ? "#FF4A4A" : "currentColor"}
                />
                <span>{post.nLikes}</span>
              </Button>
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
            <CommentSection comments={comments} />
          )}
        </main>
      </div>

      <div className="border-t border-brand-surface bg-brand-background">
        <CommentForm
          onSubmit={handleCommentSubmit}
          isPending={createCommentMutation.isPending}
        />
      </div>
    </div>
  );
}
