import type { Post } from "@/types/post.types";
import type { UICategory } from "@/constants/board";
import { createApiUrl, createAuthHeaders } from "./config";

export interface Board {
  id: number;
  value: string;
}

export const fetchBoards = async (): Promise<Board[]> => {
  const response = await fetch(`${createApiUrl("/boards")}`, {
    headers: createAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("게시판 목록을 불러오는 데 실패했습니다.");
  }

  const data = await response.json();
  return data.results || [];
};

export const fetchPosts = async (category: UICategory): Promise<Post[]> => {
  const url =
    category === "all"
      ? `${createApiUrl("/posts/search")}`
      : `${createApiUrl(`/posts/search?boardId=${category}`)}`;

  const response = await fetch(url, {
    headers: createAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("게시물 목록을 불러오는 데 실패했습니다.");
  }

  const data = await response.json();
  return data.results || [];
};

export const createPost = async (data: {
  title: string;
  content: string;
  boardId: number;
}): Promise<void> => {
  const response = await fetch(`${createApiUrl(`/posts/${data.boardId}`)}`, {
    method: "POST",
    headers: createAuthHeaders(),
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      location: {
        lng: 127.0,
        lat: 37.5,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("게시글 작성에 실패했습니다.");
  }
};
