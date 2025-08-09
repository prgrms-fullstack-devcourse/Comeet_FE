export interface Post {
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
}
