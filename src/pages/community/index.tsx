import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/layout/Header";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  Users,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  usePostDetail,
  useComments,
  useToggleLike,
  useToggleBookmark,
  useCreateComment,
  useApplicants,
  useToggleApply,
  useDeletePost,
  useUpdateComment,
  useDeleteComment,
} from "@/hooks/queries/usePosts";
import { CommentForm } from "./__components/CommentForm";
import { CommentSection } from "./__components/CommentSection";
import { ApplicantSection } from "./__components/ApplicantSection";

import { formatPostDetailDate } from "@/lib/date";

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCommentDeleteDialog, setShowCommentDeleteDialog] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  if (!postId) {
    return <div className="p-4 text-white">유효하지 않은 게시글 ID입니다.</div>;
  }

  const { data: post, isLoading, isError, error } = usePostDetail(postId);
  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useComments(postId);

  const {
    data: applicants = [],
    isLoading: isApplicantsLoading,
    isError: isApplicantsError,
  } = useApplicants(postId);

  const toggleLikeMutation = useToggleLike();
  const toggleBookmarkMutation = useToggleBookmark();
  const createCommentMutation = useCreateComment();
  const toggleApplyMutation = useToggleApply();
  const deletePostMutation = useDeletePost();
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();

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

  const handleApplyClick = async () => {
    if (!postId) return;
    try {
      await toggleApplyMutation.mutateAsync(parseInt(postId));
    } catch (error) {
      console.error("지원 처리 실패:", error);
      alert("지원 처리에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeletePost = async () => {
    if (!post) return;
    try {
      await deletePostMutation.mutateAsync(post.id);
      setShowDeleteDialog(false);
      navigate(-1);
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleEditComment = (commentId: number) => {
    setEditingCommentId(commentId);
  };

  const handleCommentEditSubmit = async (content: string) => {
    if (!editingCommentId) return;
    try {
      await updateCommentMutation.mutateAsync({
        commentId: editingCommentId,
        content,
      });
      setEditingCommentId(null);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCommentEditCancel = () => {
    setEditingCommentId(null);
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;
    try {
      await deleteCommentMutation.mutateAsync(commentToDelete);
      setShowCommentDeleteDialog(false);
      setCommentToDelete(null);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const openCommentDeleteDialog = (commentId: number) => {
    setCommentToDelete(commentId);
    setShowCommentDeleteDialog(true);
  };

  return (
    <div className="dark text-foreground h-full flex flex-col">
      <Header
        title="COMEET"
        leftIcon={<ArrowLeft />}
        rightIcon={
          post.editable ? (
            <Trash2 className="h-4 w-4" />
          ) : (
            <Bookmark
              className={
                post.bookmark ? "fill-brand-primary text-brand-primary" : ""
              }
            />
          )
        }
        onLeftClick={handleBackClick}
        onRightClick={
          post.editable ? () => setShowDeleteDialog(true) : handleBookmarkClick
        }
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

            <div className="flex items-center justify-between">
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
                {/* 일반 게시판만 댓글 개수 표시 */}
                {!post.board.isRecruit && (
                  <div className="flex items-center gap-x-2">
                    <MessageCircle className="size-4" />
                    <span>{post.nComments}</span>
                  </div>
                )}
                {/* 모집 게시판은 지원자 개수 표시 */}
                {post.board.isRecruit && (
                  <div className="flex items-center gap-x-2">
                    <Users className="size-4" />
                    <span>{post.nApplicants || applicants.length}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Separator className="bg-brand-surface !h-1" />

          {/* 일반 게시판: 댓글 표시 */}
          {!post.board.isRecruit && (
            <>
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
                  onEditComment={handleEditComment}
                  onDeleteComment={openCommentDeleteDialog}
                />
              )}
            </>
          )}

          {/* 모집 게시판: 지원자 목록 표시 */}
          {post.board.isRecruit && (
            <>
              {isApplicantsLoading ? (
                <div className="p-4 text-center text-brand-text">
                  지원자 목록을 불러오는 중...
                </div>
              ) : isApplicantsError ? (
                <div className="p-4 text-center text-red-500">
                  지원자 목록을 불러오는 데 실패했습니다.
                </div>
              ) : (
                <ApplicantSection applicants={applicants} />
              )}
            </>
          )}
        </main>
      </div>

      {/* 자유, 질문 게시판만 댓글 작성 가능 */}
      {!post.board.isRecruit && (
        <div className="border-t border-brand-surface bg-brand-background">
          <CommentForm
            onSubmit={
              editingCommentId ? handleCommentEditSubmit : handleCommentSubmit
            }
            isPending={
              editingCommentId
                ? updateCommentMutation.isPending
                : createCommentMutation.isPending
            }
            editingCommentId={editingCommentId}
            initialContent={
              editingCommentId
                ? comments.find((c) => c.id === editingCommentId)?.content || ""
                : ""
            }
            onCancel={handleCommentEditCancel}
          />
        </div>
      )}

      {/* 모각코, 프로젝트 게시판은 지원 버튼 표시 */}
      {post.board.isRecruit && (
        <div className="border-t border-brand-surface bg-brand-background p-4">
          <Button
            className={`w-full ${
              post.applied
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-brand-primary hover:bg-brand-primary/90 text-black"
            }`}
            onClick={handleApplyClick}
            disabled={toggleApplyMutation.isPending}>
            {toggleApplyMutation.isPending
              ? "처리 중..."
              : post.applied
              ? "지원 취소"
              : "지원하기"}
          </Button>
        </div>
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="w-[90%] rounded-2xl bg-brand-background border-brand-surface text-white dark">
          <AlertDialogHeader>
            <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 게시글을 삭제하시겠습니까?<br></br> 이 작업은 되돌릴 수
              없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-brand-surface border-brand-surface text-white hover:bg-brand-surface/90">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePost}
              className="bg-red-500 hover:bg-red-600 text-white">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 댓글 삭제 확인 다이얼로그 */}
      <AlertDialog
        open={showCommentDeleteDialog}
        onOpenChange={setShowCommentDeleteDialog}>
        <AlertDialogContent className="w-[90%] rounded-2xl bg-brand-background border-brand-surface text-white dark">
          <AlertDialogHeader>
            <AlertDialogTitle>댓글 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 댓글을 삭제하시겠습니까?<br></br> 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-brand-surface border-brand-surface text-white hover:bg-brand-surface/90">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteComment}
              className="bg-red-500 hover:bg-red-600 text-white">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
