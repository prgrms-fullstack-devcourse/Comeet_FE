import { useParams, useNavigate } from "react-router-dom";
import { PostContent } from "./__components/PostContent";
import { CommentSection } from "./__components/CommentSection";
import { CommentForm } from "./__components/CommentForm";
import Header from "@/components/layout/Header";
import { ArrowLeft, Bookmark } from "lucide-react";
import {
  usePost,
  useTogglePostLike,
  useAddComment,
  useToggleCommentLike,
  useToggleReplyLike,
} from "@/hooks/usePost";

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  if (!postId) {
    return <div className="p-4 text-white">유효하지 않은 게시글 ID입니다.</div>;
  }

  const { data: post, isLoading, isError, error } = usePost(postId);
  const { mutate: toggleLike, isPending: isLikePending } = useTogglePostLike();
  const { mutate: addNewComment, isPending: isAddingComment } = useAddComment();
  const { mutate: toggleCommentLike } = useToggleCommentLike();
  const { mutate: toggleReplyLike } = useToggleReplyLike();

  if (isLoading) {
    return <div className="p-4 text-white">로딩 중...</div>;
  }
  if (isError) {
    return <div className="p-4 text-white">에러 발생: {error.message}</div>;
  }
  if (!post) {
    return <div className="p-4 text-white">게시글이 없습니다.</div>;
  }

  const handleToggleCommentLike = (commentId: number) => {
    toggleCommentLike(commentId);
  };

  const handleToggleReplyLike = (replyId: number) => {
    toggleReplyLike(replyId);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBookmarkClick = () => {
    console.log("북마크 클릭");
  };

  return (
    <div className="dark text-foreground h-full flex flex-col ">
      <Header
        title="COMEET"
        leftIcon={<ArrowLeft />}
        rightIcon={<Bookmark />}
        onLeftClick={handleBackClick}
        onRightClick={handleBookmarkClick}
      />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto scrollbar-hide">
            <PostContent
              post={post}
              onLikeClick={() => toggleLike(postId)}
              isLikePending={isLikePending}
            />
            <CommentSection
              comments={post.comments}
              onToggleCommentLike={handleToggleCommentLike}
              onToggleReplyLike={handleToggleReplyLike}
            />
          </div>
          <CommentForm
            onSubmit={(content: string) => addNewComment({ postId, content })}
            isPending={isAddingComment}
          />
        </div>
      </div>
    </div>
  );
}
