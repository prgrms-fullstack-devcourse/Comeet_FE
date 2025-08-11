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
  fetchApplicants,
  toggleApply,
  deletePost,
  updateComment,
  deleteComment,
} from "@/lib/api/posts";
import type { UICategory } from "@/constants/board";
import type {
  CommentResponse,
  PostDetailResponse,
  PostListItem,
  PostDetailItem,
  PostCommentResponse,
  ApplicantResponse,
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
  return useQuery<PostListItem[]>({
    queryKey: ["posts", category],
    queryFn: async () => {
      const posts = await fetchPosts(category);
      return posts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePostDetail = (postId: string) => {
  return useQuery<PostDetailItem>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const result = await fetchPostDetail(postId);
      if (!result) {
        throw new Error("게시글 데이터가 없습니다.");
      }
      return result;
    },
    enabled: !!postId,
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
};

export const useSearchPosts = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const posts = await searchPosts(query);
      return posts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    enabled: !!query && query.trim().length > 0,
    staleTime: 0,
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
    staleTime: 0,
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

export const useApplicants = (postId: string) => {
  return useQuery<ApplicantResponse[]>({
    queryKey: ["applicants", postId],
    queryFn: () => fetchApplicants(postId),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useToggleApply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleApply,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({
        queryKey: ["applicants", variables.toString()],
      });

      queryClient.setQueryData<PostDetailItem>(
        ["post", variables.toString()],
        (oldData: PostDetailItem | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            applied: data.applied,
            nApplicants: data.applied
              ? (oldData.nApplicants || 0) + 1
              : Math.max((oldData.nApplicants || 0) - 1, 0),
          };
        }
      );

      queryClient.setQueriesData<PostListItem[]>(
        { queryKey: ["posts"] },
        (oldData: PostListItem[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map((post) => {
            if (post.id === variables) {
              return {
                ...post,
                nApplicants: data.applied
                  ? (post.nApplicants || 0) + 1
                  : Math.max((post.nApplicants || 0) - 1, 0),
              };
            }
            return post;
          });
        }
      );
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => updateComment(commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
