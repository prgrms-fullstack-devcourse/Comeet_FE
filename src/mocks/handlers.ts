import { http, HttpResponse } from "msw";
import type { Developer } from "@/types/developer";
import type { Post } from "@/types/board";
import type { ExploreTabValue } from "@/constants/explore";
import type { UICategory } from "@/constants/board";

const mockDetailedPost = {
  id: 1,
  category: "자유게시판",
  title: "상세 페이지 제목입니다",
  author: { name: "작성자", avatarUrl: "" },
  createdAt: "2025.08.05",
  content: "이 내용은 실제 백엔드 서버가 아닌, MSW가 응답한 가짜 게시글 상세 내용입니다.",
  likeCount: 100,
  isLiked: false,
  comments: [
    { id: 101, author: { name: "댓글러1", avatarUrl: "" }, content: "MSW 댓글입니다!", createdAt: "2025.08.05", likeCount: 5 },
    { id: 102, author: { name: "댓글러2", avatarUrl: "" }, content: "정말 유용한 정보네요.", createdAt: "2025.08.05", likeCount: 3 },
  ]
};

const FAKE_DEVELOPERS: Developer[] = [
  {
    id: 1,
    nickname: "주변 개발자 1",
    distance: "1km",
    position: "프론트엔드 개발자",
    stacks: ["React", "TypeScript"],
    experience: "3년차",
    image: "",
    category: "nearby",
  },
  {
    id: 2,
    nickname: "인기 개발자 1",
    distance: "10km",
    position: "백엔드 개발자",
    stacks: ["Node.js", "NestJS"],
    experience: "5년차",
    image: "",
    category: "popular",
  },
  {
    id: 3,
    nickname: "관심 개발자 1",
    distance: "5km",
    position: "풀스택 개발자",
    stacks: ["React", "Node.js"],
    experience: "1년차",
    image: "",
    category: "favorite",
  },
  {
    id: 4,
    nickname: "주변 개발자 2",
    distance: "500m",
    position: "iOS 개발자",
    stacks: ["Swift", "SwiftUI"],
    experience: "2년차",
    image: "",
    category: "nearby",
  },
  {
    id: 5,
    nickname: "인기 개발자 2",
    distance: "25km",
    position: "데브옵스 엔지니어",
    stacks: ["Docker", "Kubernetes", "AWS"],
    experience: "7년차",
    image: "",
    category: "popular",
  },
];
const ALL_POSTS: Post[] = [
  {
    id: 1,
    categoryId: 1,
    title: "오늘 날씨 좋네요! 다들 뭐하시나요?",
    author: "하늘구경",
    date: "2025.07.29",
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    categoryId: 2,
    title: "리액트 Hook 질문 있습니다. useEffect 종속성 배열 관련...",
    author: "궁금해요",
    date: "2025.07.28",
    likes: 3,
    comments: 2,
  },
  {
    id: 3,
    categoryId: 3,
    title: "사이드 프로젝트 팀원 구합니다! (프론트 1, 백엔드 1)",
    author: "열정맨",
    date: "2025.07.27",
    likes: 25,
    comments: 18,
  },
  {
    id: 4,
    categoryId: 4,
    title: "이번 주말에 강남에서 같이 코딩하실 분?",
    author: "코딩친구",
    date: "2025.07.26",
    likes: 8,
    comments: 4,
  },
  {
    id: 5,
    categoryId: 1,
    title: "다들 점심 뭐 드셨나요? 메뉴 추천 받습니다.",
    author: "배고파요",
    date: "2025.07.29",
    likes: 2,
    comments: 7,
  },
];
const POSITION_DATA = [
  {
    category: "프론트엔드",
    positions: [
      {
        id: 1,
        name: "웹 프론트엔드",
        description: "React, Vue, Angular 등 웹 프론트엔드 기술을 다룹니다.",
      },
      {
        id: 2,
        name: "모바일 앱 (크로스플랫폼)",
        description:
          "React Native, Flutter 등 크로스플랫폼 앱 기술을 다룹니다.",
      },
    ],
  },
  {
    category: "백엔드",
    positions: [
      {
        id: 3,
        name: "웹 서버",
        description: "Node.js, Java, Python 등 서버 개발을 담당합니다.",
      },
      {
        id: 4,
        name: "데이터베이스",
        description:
          "MySQL, MongoDB 등 데이터베이스 설계 및 관리를 담당합니다.",
      },
    ],
  },
];
const ALL_STACKS = [
  { id: 1, label: "JavaScript" },
  { id: 2, label: "TypeScript" },
  { id: 3, label: "React" },
  { id: 4, label: "Vue.js" },
  { id: 5, label: "Next.js" },
  { id: 6, label: "Node.js" },
  { id: 7, label: "Java" },
  { id: 8, label: "Spring" },
  { id: 9, label: "Python" },
  { id: 10, label: "Django" },
  { id: 11, label: "Swift" },
  { id: 12, label: "Kotlin" },
  { id: 13, label: "Flutter" },
  { id: 14, label: "React Native" },
  { id: 15, label: "Docker" },
  { id: 16, label: "Kubernetes" },
  { id: 17, label: "AWS" },
  { id: 18, label: "Git" },
];

export const handlers = [
  // 개발자 목록
  http.get("/api/developers", ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") as ExploreTabValue;
    const filteredDevelopers = FAKE_DEVELOPERS.filter(
      (dev) => dev.category === category
    );
    return HttpResponse.json(filteredDevelopers);
  }),

  // 게시글 목록
  http.get("/api/posts", ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") as UICategory;
    if (category === "all") {
      return HttpResponse.json(ALL_POSTS);
    }
    const numericId = parseInt(category, 10);
    const filtered = ALL_POSTS.filter((post) => post.categoryId === numericId);
    return HttpResponse.json(filtered);
  }),

  // 포지션 목록
  http.get("/api/positions", () => {
    return HttpResponse.json(POSITION_DATA);
  }),

  // 스택 목록
  http.get("/api/stacks", () => {
    return HttpResponse.json(ALL_STACKS);
  }),

// 온보딩 프로필 업데이트
  http.patch('/api/users', async ({ request }) => {
    const data = await request.json();
    console.log('MSW: 온보딩 데이터 수신 완료!', data);
    return new HttpResponse(null, { status: 204 });
  }),

  // 게시글 상세 정보
  http.get('/api/posts/:postId', ({ params }) => {
    console.log(`MSW: ${params.postId}번 게시글 상세 정보 요청`);
    // id만 일치시키고 나머지 데이터는 mock 사용
    return HttpResponse.json({ ...mockDetailedPost, id: Number(params.postId) });
  }),

  // 댓글 목록
  http.get('/api/posts/:postId/comments', ({ params }) => {
    console.log(`MSW: ${params.postId}번 게시글의 댓글 목록 요청`);
    return HttpResponse.json(mockDetailedPost.comments);
  }),

  // 게시글 좋아요
  http.put('/api/posts/:postId/like', ({ params }) => {
    console.log(`MSW: ${params.postId}번 게시글 좋아요 요청`);
    mockDetailedPost.isLiked = !mockDetailedPost.isLiked;
    mockDetailedPost.likeCount += mockDetailedPost.isLiked ? 1 : -1;
    return new HttpResponse(null, { status: 204 });
  }),
  
  // 새 댓글 작성
  http.post('/api/posts/:postId/comments', async ({ request, params }) => {
    const newComment = await request.json();
    console.log(`MSW: ${params.postId}번 게시글에 새 댓글 추가`, newComment);
    return new HttpResponse(null, { status: 201 });
  }),

  ];