import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPosts,
  createPost,
  fetchBoards,
  fetchPostDetail,
  searchPosts,
  fetchComments,
} from "@/lib/api/posts";
import type { UICategory } from "@/constants/board";
import type { Post } from "@/types/post.types";
import type { Comment } from "@/types/community.types";

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
  return useQuery<Post>({
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
  return useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
