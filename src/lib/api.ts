import type { Post } from "@/types/board";

// 가상의 전체 데이터베이스
const ALL_POSTS: Post[] = [
  {
    id: 1,
    categoryId: 1,
    title: "오늘 날씨 좋네요!",
    author: "하늘구경",
    date: "2024.07.29",
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    categoryId: 2,
    title: "리액트 Hook 질문 있습니다.",
    author: "궁금해요",
    date: "2024.07.28",
    likes: 3,
    comments: 2,
  },
  {
    id: 3,
    categoryId: 3,
    title: "사이드 프로젝트 팀원 구합니다!",
    author: "열정맨",
    date: "2024.07.27",
    likes: 25,
    comments: 18,
  },
  {
    id: 4,
    categoryId: 4,
    title: "이번 주말에 강남에서 같이 코딩하실 분?",
    author: "코딩친구",
    date: "2024.07.26",
    likes: 8,
    comments: 4,
  },
  {
    id: 5,
    categoryId: 1,
    title: "다들 점심 뭐 드셨나요?",
    author: "배고파요",
    date: "2024.07.29",
    likes: 2,
    comments: 7,
  },
  {
    id: 6,
    categoryId: 2,
    title: "useEffect 종속성 배열 질문드립니다.",
    author: "리액트초보",
    date: "2024.07.28",
    likes: 5,
    comments: 3,
  },
  {
    id: 7,
    categoryId: 3,
    title: "토이 프로젝트 아이디어 공유해요",
    author: "아이디어뱅크",
    date: "2024.07.27",
    likes: 31,
    comments: 11,
  },
];

/**
 * categoryId에 해당하는 게시물 목록을 가져오는 가상 API 함수
 * @param categoryId - 'all' 또는 '1', '2', '3', '4'
 */
export const fetchPosts = (categoryId: string): Promise<Post[]> => {
  if (categoryId === "all") {
    return Promise.resolve(ALL_POSTS);
  } else {
    const numericId = parseInt(categoryId, 10);
    const filtered = ALL_POSTS.filter((post) => post.categoryId === numericId);
    return Promise.resolve(filtered);
  }
};
