import type { Post } from "@/types/post.types";
import type { Comment } from "@/types/community.types";
import type { UICategory } from "@/constants/board";
import { createApiUrl, createAuthHeaders } from "./config";

export interface Board {
  id: number;
  value: string;
}

//게시판 카테고리 조회
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

//게시글 목록 조회회
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

//게시글 생성성
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

//게시글 상세 조회
export const fetchPostDetail = async (postId: string): Promise<Post> => {
  const response = await fetch(`${createApiUrl(`/posts/details/${postId}`)}`, {
    headers: createAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("게시글을 불러오는 데 실패했습니다.");
  }

  const data = await response.json();
  console.log("🔍 fetchPostDetail API Response:", data);

  // API는 게시글 데이터를 직접 반환
  return data;
};

// 댓글 조회
export const fetchComments = async (postId: string): Promise<Comment[]> => {
  const response = await fetch(`${createApiUrl(`/posts/${postId}`)}`, {
    headers: createAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("댓글 목록을 불러오는 데 실패했습니다.");
  }

  const data = await response.json();
  return data.results || [];
};

// 댓글 생성
export const createComment = async (
  postId: string,
  content: string
): Promise<{ nComments: number }> => {
  const response = await fetch(`${createApiUrl(`/posts/${postId}`)}`, {
    method: "POST",
    headers: createAuthHeaders(),
    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    throw new Error("댓글 작성에 실패했습니다.");
  }

  const data = await response.json();
  return data;
};

// 게시글 검색
export const searchPosts = async (query: string): Promise<Post[]> => {
  const response = await fetch(
    `${createApiUrl(`/posts/search?query=${encodeURIComponent(query)}`)}`,
    {
      headers: createAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("게시글 검색에 실패했습니다.");
  }

  const data = await response.json();
  return data.results || [];
};
