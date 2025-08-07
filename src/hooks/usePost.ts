import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post, Comment } from "@/types/community";

const fetchPost = async (postId: string): Promise<Post> => {
  const res = await fetch(`/api/posts/${postId}`);
  if (!res.ok) throw new Error("게시글을 불러오는데 실패했습니다.");
  return res.json();
};

const fetchComments = async (postId: string): Promise<Comment[]> => {
  const res = await fetch(`/api/posts/${postId}/comments`);
  if (!res.ok) throw new Error("댓글을 불러오는데 실패했습니다.");
  return res.json();
};

export function usePost(postId: string) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    enabled: !!postId,
  });
}

const togglePostLike = async (postId: string) => {
  const res = await fetch(`/api/posts/${postId}/like`, { method: "PUT" });
  if (!res.ok) throw new Error("좋아요 클릭에 실패했습니다.");
  return res.json();
};

export function useTogglePostLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: togglePostLike,
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
}

const addComment = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) => {
  const res = await fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("댓글 작성에 실패했습니다.");
  return res.json();
};

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addComment,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
    },
  });
}

const toggleCommentLike = async (commentId: number) => {
  const res = await fetch(`/api/comments/${commentId}/like`, { method: "PUT" });
  if (!res.ok) throw new Error("댓글 좋아요 클릭에 실패했습니다.");
  return res.json();
};

export function useToggleCommentLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
}

const toggleReplyLike = async (replyId: number) => {
  const res = await fetch(`/api/replies/${replyId}/like`, { method: "PUT" });
  if (!res.ok) throw new Error("답글 좋아요 클릭에 실패했습니다.");
  return res.json();
};

export function useToggleReplyLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleReplyLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
}
