import type { Stack, PositionsInterestsResponse } from "@/types/tags.types";
import { API_BASE_URL } from "./config";

export const fetchStacks = async (keyword: string = ""): Promise<Stack[]> => {
  const response = await fetch(
    `${API_BASE_URL}/tags/tech-stack?keyword=${encodeURIComponent(keyword)}`
  );
  if (!response.ok) {
    throw new Error("기술 스택 목록을 불러오는 데 실패했습니다.");
  }
  const data = await response.json();
  return data.results;
};

export const fetchPositionsInterests =
  async (): Promise<PositionsInterestsResponse> => {
    const response = await fetch(`${API_BASE_URL}/tags/positions-interests`);
    if (!response.ok) {
      throw new Error("포지션과 관심사 목록을 불러오는 데 실패했습니다.");
    }
    return response.json();
  };
