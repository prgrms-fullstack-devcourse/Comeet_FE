export interface Comment {
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
