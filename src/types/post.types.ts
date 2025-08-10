export interface PostListResponse {
  id: number;
  board: {
    id: number;
    value: string;
    isRecruit: boolean;
  };
  author: {
    avatar: string;
    nickname: string;
  };
  title: string;
  nComments: number;
  nLikes: number;
  createdAt: string;
}

export interface PostDetailResponse {
  id: number;
  board: {
    id: number;
    value: string;
    isRecruit: boolean;
  };
  author: {
    avatar: string;
    nickname: string;
  };
  title: string;
  content: string;
  nComments: number;
  nLikes: number;
  createdAt: string;
  editable: boolean;
  likeIt: boolean;
  bookmark: boolean;
}

export interface CommentResponse {
  id: number;
  postId: number;
  author: {
    nickname: string;
    avatar: string;
  };
  content: string;
  editable: boolean;
  createdAt: string;
}

export interface LikeToggleResponse {
  nLikes: number;
  likeIt: boolean;
}

export interface BookmarkToggleResponse {
  bookmark: boolean;
}

export interface PostCommentResponse {
  nComments: number;
}

// ===== Request Types =====

// 게시글 생성 요청
export interface CreatePostRequest {
  title: string;
  content: string;
  location: {
    lng: number;
    lat: number;
  };
}

export interface CreateCommentRequest {
  content: string;
}
