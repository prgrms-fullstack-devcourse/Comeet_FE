export interface Comment {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  createdAt: string;
  likeCount: number;
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