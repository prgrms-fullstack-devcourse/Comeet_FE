import type { Post } from "@/types/board.types";
import type { UICategory } from "@/constants/board";
import { createApiUrl } from "./config";

export const fetchPosts = async (category: UICategory): Promise<Post[]> => {
  const response = await fetch(
    `${createApiUrl("/posts")}?category=${category}`
  );
  if (!response.ok) {
    throw new Error("게시물 목록을 불러오는 데 실패했습니다.");
  }
  return response.json();
};
