import { useParams } from "react-router-dom";
import { PostContent } from "./__components/PostContent";
import { CommentSection } from "./__components/CommentSection";
import { CommentForm } from "./__components/CommentForm";
import GlobalLayout from "@/components/layout/GlobalLayout";
import { usePost, useTogglePostLike, useAddComment } from "@/hooks/usePost";

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    return <div className="p-4 text-white">유효하지 않은 게시글 ID입니다.</div>;
  }

  const { data: post, isLoading, isError, error } = usePost(postId);
  const { mutate: toggleLike, isPending: isLikePending } = useTogglePostLike();
  const { mutate: addNewComment, isPending: isAddingComment } = useAddComment();

  if (isLoading) {
    return <div className="p-4 text-white">로딩 중...</div>;
  }
  if (isError) {
    return <div className="p-4 text-white">에러 발생: {error.message}</div>;
  }
  if (!post) {
    return <div className="p-4 text-white">게시글이 없습니다.</div>;
  }

  const handleToggleCommentLike = (commentId: number) =>
    console.log("like comment:", commentId);

  return (
    <GlobalLayout>
      <div className="flex flex-col h-full">
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
