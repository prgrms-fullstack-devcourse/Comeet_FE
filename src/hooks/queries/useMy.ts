import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyProfile, updateMyProfile } from "@/lib/api/my";
import type {
  GetProfileResponse,
  UpdateProfileRequest,
} from "@/types/my.types";

export const useMyProfile = () => {
  return useQuery<GetProfileResponse>({
    queryKey: ["myProfile"],
    queryFn: fetchMyProfile,
  });
};

// 내가 쓴 게시물
export const useMyPosts = () => {
  return useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
      const { fetchMyPosts } = await import("@/lib/api/my");
      return fetchMyPosts();
    },
  });
};

// 지원한 모집글
export const useMyApplies = () => {
  return useQuery({
    queryKey: ["myApplies"],
    queryFn: async () => {
      const { fetchMyApplies } = await import("@/lib/api/my");
      return fetchMyApplies();
    },
  });
};

// 내가 쓴 댓글
export const useMyComments = () => {
  return useQuery({
    queryKey: ["myComments"],
    queryFn: async () => {
      const { fetchMyComments } = await import("@/lib/api/my");
      return fetchMyComments();
    },
  });
};

// 북마크한 게시물
export const useMyBookmarks = () => {
  return useQuery({
    queryKey: ["myBookmarks"],
    queryFn: async () => {
      const { fetchMyBookmarks } = await import("@/lib/api/my");
      return fetchMyBookmarks();
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
};

// 로그아웃
export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { signOut } = await import("@/lib/api/my");
      return signOut();
    },
    onSuccess: () => {
      queryClient.clear();
      window.location.href = "/login";
    },
  });
};

// 계정 삭제
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { deleteAccount } = await import("@/lib/api/my");
      return deleteAccount();
    },
    onSuccess: () => {
      queryClient.clear();
      window.location.href = "/login";
    },
  });
};
