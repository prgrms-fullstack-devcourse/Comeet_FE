import { useParams } from "react-router-dom";
import { PostHeader } from "./__components/PostHeader";
import { PostContent } from "./__components/PostContent";
import { CommentSection } from "./__components/CommentSection";
import { CommentForm } from "./__components/CommentForm";
import GlobalLayout from "@/components/layout/GlobalLayout";
import { usePost, useTogglePostLike, useAddComment } from "@/hooks/usePost";

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    return (
      <GlobalLayout variant="black">
        <div className="p-4 text-white">유효하지 않은 게시글 ID입니다.</div>
      </GlobalLayout>
    );
  }

  const { data: post, isLoading, isError, error } = usePost(postId);
  const { mutate: toggleLike, isPending: isLikePending } = useTogglePostLike();
  const { mutate: addNewComment, isPending: isAddingComment } = useAddComment();

  if (isLoading) {
    return (
      <GlobalLayout variant="black">
        <div className="p-4 text-white">로딩 중...</div>
      </GlobalLayout>
    );
  }
  if (isError) {
    return (
      <GlobalLayout variant="black">
        <div className="p-4 text-white">에러 발생: {error.message}</div>
      </GlobalLayout>
    );
  }
  if (!post) {
    return (
      <GlobalLayout variant="black">
        <div className="p-4 text-white">게시글이 없습니다.</div>
      </GlobalLayout>
    );
  }

  const handleToggleCommentLike = (commentId: number) =>
    console.log("like comment:", commentId);
  const handleBookmarkClick = () => console.log("bookmark post");

  return (
    <GlobalLayout variant="black">
      <div className="flex flex-col h-full">
        <PostHeader onBookmarkClick={handleBookmarkClick} />
        <div className="flex-grow overflow-y-auto px-4">
          <PostContent
            post={post}
            onLikeClick={() => toggleLike(postId)}
            isLikePending={isLikePending}
          />
          <CommentSection
            comments={post.comments}
            onToggleCommentLike={handleToggleCommentLike}
          />
        </div>
        <CommentForm
          onSubmit={(content: string) => addNewComment({ postId, content })}
          isPending={isAddingComment}
        />
      </div>
    </GlobalLayout>
  );
}
