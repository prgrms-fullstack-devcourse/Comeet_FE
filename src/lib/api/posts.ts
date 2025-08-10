import type {
  CommentResponse,
  PostDetailResponse,
  CreatePostRequest,
  LikeToggleResponse,
  BookmarkToggleResponse,
  PostCommentResponse,
} from "@/types/post.types";
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
export const fetchPosts = async (
  category: UICategory
): Promise<PostDetailResponse[]> => {
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

//게시글 생성
export const createPost = async (data: CreatePostRequest): Promise<void> => {
  const response = await fetch(`${createApiUrl(`/posts`)}`, {
    method: "POST",
    headers: createAuthHeaders(),
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      location: data.location,
    }),
  });

  if (!response.ok) {
    throw new Error("게시글 작성에 실패했습니다.");
  }
};

//게시글 상세 조회
export const fetchPostDetail = async (
  postId: string
): Promise<PostDetailResponse> => {
  const response = await fetch(`${createApiUrl(`/posts/details/${postId}`)}`, {
    headers: createAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("게시글을 불러오는 데 실패했습니다.");
  }

  const data = await response.json();
  return data;
};

// 댓글 조회
export const fetchComments = async (
  postId: string
): Promise<CommentResponse[]> => {
  const response = await fetch(`${createApiUrl(`/posts/${postId}/comments`)}`, {
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
): Promise<PostCommentResponse> => {
  const url = `${createApiUrl(`/posts/${postId}/comments`)}`;
  const headers = createAuthHeaders();
  const body = JSON.stringify({ content });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `댓글 작성에 실패했습니다: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
};

// 게시글 검색
export const searchPosts = async (
  query: string
): Promise<PostDetailResponse[]> => {
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

//좋아용용
export const toggleLike = async (
  postId: number
): Promise<LikeToggleResponse> => {
  const response = await fetch(`${createApiUrl(`/posts/${postId}/likes`)}`, {
    method: "PUT",
    headers: createAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("좋아요 처리에 실패했습니다.");
  }

  return response.json();
};

//북마크
export const toggleBookmark = async (
  postId: number
): Promise<BookmarkToggleResponse> => {
  const response = await fetch(
    `${createApiUrl(`/posts/${postId}/bookmarks`)}`,
    {
      method: "PUT",
      headers: createAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("북마크 처리에 실패했습니다.");
  }

  return response.json();
};
