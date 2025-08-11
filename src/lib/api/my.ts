import type {
  GetProfileResponse,
  UpdateProfileRequest,
} from "@/types/my.types";
import { createApiUrl, createAuthHeaders } from "./config";

export const fetchMyProfile = async (): Promise<GetProfileResponse> => {
  const url = `${createApiUrl("/users")}`;
  const headers = createAuthHeaders();
  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `프로필을 불러오는 데 실패했습니다: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  return data;
};

export const updateMyProfile = async (
  data: UpdateProfileRequest
): Promise<void> => {
  const url = `${createApiUrl("/users")}`;
  const headers = createAuthHeaders();
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `프로필 수정에 실패했습니다: ${response.status} ${response.statusText}`
    );
  }
};

// 내가 쓴 게시물 검색
export const fetchMyPosts = async (): Promise<any[]> => {
  const url = `${createApiUrl("/posts/users")}`;
  const headers = createAuthHeaders();

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `내 게시물을 불러오는 데 실패했습니다: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.results || [];
};

// 지원한 모집글 검색
export const fetchMyApplies = async (): Promise<any[]> => {
  const url = `${createApiUrl("/posts/applies")}`;
  const headers = createAuthHeaders();

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `지원 내역을 불러오는 데 실패했습니다: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.results || [];
};

// 내가 쓴 댓글 조회
export const fetchMyComments = async (): Promise<any[]> => {
  const url = `${createApiUrl("/posts/comments/users")}`;
  const headers = createAuthHeaders();

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `내 댓글을 불러오는 데 실패했습니다: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.results || [];
};

// 북마크한 게시물 검색
export const fetchMyBookmarks = async (): Promise<any[]> => {
  const url = `${createApiUrl("/posts/bookmarks")}`;
  const headers = createAuthHeaders();

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `북마크를 불러오는 데 실패했습니다: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.results || [];
};

// 로그아웃
export const signOut = async (): Promise<void> => {
  const url = `${createApiUrl("/auth/sign-out")}`;
  const headers = createAuthHeaders();

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `로그아웃에 실패했습니다: ${response.status} ${response.statusText}`
    );
  }
};

// 계정 삭제
export const deleteAccount = async (): Promise<void> => {
  const url = `${createApiUrl("/users")}`;
  const headers = createAuthHeaders();

  const response = await fetch(url, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `계정 삭제에 실패했습니다: ${response.status} ${response.statusText}`
    );
  }
};
