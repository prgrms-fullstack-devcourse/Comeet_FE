import type { Developer } from "@/types/developer.types";
import type { ExploreTabValue } from "@/constants/explore";
import { createApiUrl } from "./config";

export const fetchDevelopers = async (
  category: ExploreTabValue
): Promise<Developer[]> => {
  const response = await fetch(
    `${createApiUrl("/developers")}?category=${category}`
  );
  if (!response.ok) {
    throw new Error("개발자 목록을 불러오는 데 실패했습니다.");
  }
  return response.json();
};
