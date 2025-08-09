export interface Reply {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
}

export interface Comment {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
  replyCount: number;
  replies?: Reply[];
}

export interface Post {
  id: number;
  category: string;
  title: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  comments: Comment[];
}
