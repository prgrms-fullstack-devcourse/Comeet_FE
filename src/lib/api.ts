import type { Post } from "@/types/board";
import type { UICategory } from "@/constants/board";
import type { Developer } from "@/types/developer";
import type { ExploreTabValue } from "@/constants/explore";
import type { PositionCategory, Stack } from "@/types/filter";
import type { FetchLoginResponse } from "@/types/auth";

export const fetchPosts = async (category: UICategory): Promise<Post[]> => {
  const response = await fetch(`/api/posts?category=${category}`);
  if (!response.ok) {
    throw new Error("게시물 목록을 불러오는 데 실패했습니다.");
  }
  return response.json();
};

export const fetchDevelopers = async (
  category: ExploreTabValue
): Promise<Developer[]> => {
  const response = await fetch(`/api/developers?category=${category}`);
  if (!response.ok) {
    throw new Error("개발자 목록을 불러오는 데 실패했습니다.");
  }
  return response.json();
};

export const fetchPositions = async (): Promise<PositionCategory[]> => {
  const response = await fetch("/api/positions");
  if (!response.ok) {
    throw new Error("포지션 목록을 불러오는 데 실패했습니다.");
  }
  return response.json();
};

export const fetchStacks = async (): Promise<Stack[]> => {
  const response = await fetch("/api/stacks");
  if (!response.ok) {
    throw new Error("기술 스택 목록을 불러오는 데 실패했습니다.");
  }
  return response.json();
};

export const fetchLogin = async (code: string): Promise<FetchLoginResponse> => {
  const response = await fetch(`/api/auth/sign-in?code=${encodeURIComponent(code)}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub 로그인 실패: ${response.status}`);
  }

  const data = await response.json();

  if (response.status === 200) {
    return {
      status: 200,
      token: data.token
    };
  } else if (response.status === 210) {
    return {
      status: 210,
      githubId: data.githubId
    };
  } else {
    throw new Error(`예상하지 못한 응답 상태: ${response.status}`);
  }
};