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
  const response = await fetch(
    `/api/auth/sign-in?code=${encodeURIComponent(code)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub 로그인 실패: ${response.status}`);
  }

  const data = await response.json();

  // [수정] 백엔드의 새로운 응답 형식에 맞춰 데이터를 해석합니다.
  // 경우 1: 기존 유저 (응답에 'result' 객체와 그 안의 'accessToken'이 있음)
  if (data.result && data.result.accessToken) {
    return {
      status: 200,
      accessToken: data.result.accessToken,
      sessionId: data.result.sessionId,
      user: data.result.user,
    };
  }
  // 경우 2: 신규 유저 (응답 최상위에 'sessionId'가 있음)
  else if (data.sessionId) {
    return {
      status: 210,
      githubId: data.githubId,
      sessionId: data.sessionId,
      user: data.user,
    };
  }
  // 경우 3: 예상치 못한 응답
  else {
    throw new Error(`예상하지 못한 응답 데이터: ${JSON.stringify(data)}`);
  }
};
