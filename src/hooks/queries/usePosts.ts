import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPosts,
  createPost,
  fetchBoards,
  fetchPostDetail,
  searchPosts,
  fetchComments,
  createComment,
  toggleLike,
  toggleBookmark,
} from "@/lib/api/posts";
import type { UICategory } from "@/constants/board";
import type {
  CommentResponse,
  PostDetailResponse,
  PostCommentResponse,
} from "@/types/post.types";

export const useBoards = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const usePosts = (category: UICategory) => {
  return useQuery({
    queryKey: ["posts", category],
    queryFn: () => fetchPosts(category),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePostDetail = (postId: string) => {
  return useQuery<PostDetailResponse>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const result = await fetchPostDetail(postId);
      if (!result) {
        throw new Error("게시글 데이터가 없습니다.");
      }
      return result;
    },
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
};

export const useSearchPosts = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchPosts(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useComments = (postId: string) => {
  return useQuery<CommentResponse[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLike,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
      queryClient.setQueryData<PostDetailResponse>(
        ["post", variables.toString()],
        (oldData: PostDetailResponse | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            nLikes: data.nLikes,
            likeIt: data.likeIt,
          };
        }
      );
    },
  });
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleBookmark,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
      queryClient.setQueryData<PostDetailResponse>(
        ["post", variables.toString()],
        (oldData: PostDetailResponse | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            bookmark: data.bookmark,
          };
        }
      );
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      createComment(postId, content),
    onSuccess: (data: PostCommentResponse, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueryData<PostDetailResponse>(
        ["post", variables.postId],
        (oldData: PostDetailResponse | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            nComments: data.nComments,
          };
        }
      );
    },
  });
};
