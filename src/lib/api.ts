import type { Post } from "@/types/board";
import type { UICategory } from "@/constants/board";
import type { Developer } from "@/types/developer";
import type { ExploreTabValue } from "@/constants/explore";
import type { PositionCategory, Stack } from "@/types/filter";

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
