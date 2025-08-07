import { http, HttpResponse } from "msw";
import type { Developer } from "@/types/developer";
import type { Post } from "@/types/board";
import type { ExploreTabValue } from "@/constants/explore";
import type { UICategory } from "@/constants/board";
import type { Post as CommunityPost, Comment, Reply } from "@/types/community";

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

const POST_DETAIL_DATA: CommunityPost[] = [
  {
    id: 1,
    category: "자유",
    title: "오늘 날씨 좋네요! 다들 뭐하시나요?",
    author: {
      name: "하늘구경",
      avatarUrl: "",
    },
    createdAt: "2025.07.29",
    content:
      "오늘 날씨가 정말 좋네요! 다들 뭐하고 계신가요? 저는 오늘 공원에서 산책하고 왔어요. 코딩도 하고 운동도 하고, 정말 좋은 하루였습니다. 여러분도 좋은 하루 보내세요!",
    likeCount: 12,
    isLiked: false,
    comments: [
      {
        id: 1,
        author: {
          name: "코딩러버",
          avatarUrl: "",
        },
        content:
          "저도 오늘 날씨 좋았어요! 집에서 코딩하고 있었는데, 창밖을 보니 정말 맑네요.",
        createdAt: "2025.07.29 14:30",
        likeCount: 3,
        isLiked: false,
        replyCount: 2,
        replies: [
          {
            id: 101,
            author: {
              name: "날씨좋아요",
              avatarUrl: "",
            },
            content:
              "저도 오늘 정말 날씨가 좋았어요! 창밖을 보니 하늘이 너무 맑네요.",
            createdAt: "2025.07.29 15:00",
            likeCount: 1,
            isLiked: false,
          },
          {
            id: 102,
            author: {
              name: "산책러버",
              avatarUrl: "",
            },
            content:
              "저도 공원에서 산책했어요! 코딩하다가 잠깐 나가니까 정말 좋았어요.",
            createdAt: "2025.07.29 15:30",
            likeCount: 2,
            isLiked: true,
          },
        ],
      },
      {
        id: 2,
        author: {
          name: "개발자킹",
          avatarUrl: "",
        },
        content:
          "저는 오늘 새로운 프로젝트를 시작했어요. React와 TypeScript로 뭔가 만들어보려고 해요.",
        createdAt: "2025.07.29 15:15",
        likeCount: 5,
        isLiked: true,
        replyCount: 0,
      },
    ],
  },
  {
    id: 2,
    category: "질문",
    title: "리액트 Hook 질문 있습니다. useEffect 종속성 배열 관련...",
    author: {
      name: "궁금해요",
      avatarUrl: "",
    },
    createdAt: "2025.07.28",
    content:
      "안녕하세요! React useEffect의 종속성 배열에 대해 질문이 있습니다. 빈 배열 []을 넣으면 컴포넌트가 마운트될 때만 실행되는 건 알겠는데, 의존성 배열에 함수를 넣으면 어떻게 되나요? 예를 들어 [fetchData] 같은 식으로요. 이렇게 하면 fetchData 함수가 변경될 때마다 useEffect가 실행되는 건가요?",
    likeCount: 3,
    isLiked: true,
    comments: [
      {
        id: 3,
        author: {
          name: "React마스터",
          avatarUrl: "",
        },
        content:
          "네, 맞습니다! 의존성 배열에 함수를 넣으면 그 함수가 변경될 때마다 useEffect가 실행됩니다. 그래서 보통 useCallback을 사용해서 함수를 메모이제이션하거나, 함수를 useEffect 내부로 이동시키는 방법을 사용해요.",
        createdAt: "2025.07.28 16:20",
        likeCount: 8,
        isLiked: false,
        replyCount: 1,
        replies: [
          {
            id: 201,
            author: {
              name: "React초보",
              avatarUrl: "",
            },
            content:
              "정말 도움이 되는 답변 감사합니다! useCallback에 대해 더 자세히 알고 싶어요.",
            createdAt: "2025.07.28 17:00",
            likeCount: 3,
            isLiked: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    category: "프로젝트",
    title: "사이드 프로젝트 팀원 구합니다! (프론트 1, 백엔드 1)",
    author: {
      name: "열정맨",
      avatarUrl: "",
    },
    createdAt: "2025.07.27",
    content:
      "안녕하세요! 현재 사이드 프로젝트를 진행하고 있는데, 팀원을 구하고 있습니다. 프로젝트는 React + Node.js로 개발할 예정이고, 프론트엔드 개발자 1명, 백엔드 개발자 1명을 찾고 있어요. 주 2-3회 온라인 미팅 예정이고, 3개월 정도 진행할 계획입니다. 관심 있으신 분은 댓글로 연락처 남겨주세요!",
    likeCount: 25,
    isLiked: false,
    comments: [
      {
        id: 4,
        author: {
          name: "프론트엔드러버",
          avatarUrl: "",
        },
        content:
          "안녕하세요! 프론트엔드 개발자입니다. React 경험 2년 있고, TypeScript도 사용 가능해요. 어떤 프로젝트인지 더 자세히 알 수 있을까요?",
        createdAt: "2025.07.27 18:30",
        likeCount: 12,
        isLiked: true,
        replyCount: 3,
        replies: [
          {
            id: 301,
            author: {
              name: "열정맨",
              avatarUrl: "",
            },
            content:
              "안녕하세요! 프로젝트는 웹 기반 소셜 플랫폼입니다. React + Node.js로 개발할 예정이에요.",
            createdAt: "2025.07.27 19:00",
            likeCount: 5,
            isLiked: true,
          },
          {
            id: 302,
            author: {
              name: "프론트엔드러버",
              avatarUrl: "",
            },
            content: "좋아요! 어떤 기능들이 포함될 예정인가요?",
            createdAt: "2025.07.27 19:15",
            likeCount: 2,
            isLiked: false,
          },
          {
            id: 303,
            author: {
              name: "열정맨",
              avatarUrl: "",
            },
            content:
              "사용자 인증, 게시글 작성, 댓글, 좋아요 기능 등이 포함될 예정입니다!",
            createdAt: "2025.07.27 19:30",
            likeCount: 4,
            isLiked: false,
          },
        ],
      },
      {
        id: 5,
        author: {
          name: "백엔드개발자",
          avatarUrl: "",
        },
        content:
          "백엔드 개발자입니다! Node.js, Express 경험 있고, MongoDB도 사용 가능해요. 프로젝트 구체적인 내용 궁금해요.",
        createdAt: "2025.07.27 19:15",
        likeCount: 7,
        isLiked: false,
        replyCount: 0,
      },
    ],
  },
  {
    id: 4,
    category: "모각코",
    title: "이번 주말에 강남에서 같이 코딩하실 분?",
    author: {
      name: "코딩친구",
      avatarUrl: "",
    },
    createdAt: "2025.07.26",
    content:
      "안녕하세요! 이번 주말에 강남역 근처 카페에서 같이 코딩하실 분 구해요. 각자 프로젝트 하면서 서로 피드백 주고받는 식으로 진행하려고 해요. 시간은 토요일 오후 2시부터 6시까지 예정입니다. 관심 있으신 분 댓글로 남겨주세요!",
    likeCount: 8,
    isLiked: false,
    comments: [
      {
        id: 6,
        author: {
          name: "주말코딩러",
          avatarUrl: "",
        },
        content:
          "안녕하세요! 저도 참여하고 싶어요. 강남역 어느 카페에서 진행하실 건가요?",
        createdAt: "2025.07.26 20:45",
        likeCount: 3,
        isLiked: true,
        replyCount: 1,
        replies: [
          {
            id: 401,
            author: {
              name: "코딩친구",
              avatarUrl: "",
            },
            content:
              "강남역 2번 출구 근처 스타벅스에서 진행할 예정입니다! 시간은 오후 2시부터 6시까지예요.",
            createdAt: "2025.07.26 21:00",
            likeCount: 2,
            isLiked: false,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    category: "자유",
    title: "다들 점심 뭐 드셨나요? 메뉴 추천 받습니다.",
    author: {
      name: "배고파요",
      avatarUrl: "",
    },
    createdAt: "2025.07.29",
    content:
      "오늘 점심 메뉴 고민 중이에요. 다들 뭐 드셨나요? 개발자들 사이에서 인기 있는 점심 메뉴나 추천하고 싶은 메뉴 있으시면 알려주세요! 저는 보통 김치찌개나 된장찌개를 자주 먹는데, 오늘은 뭔가 다르게 먹고 싶어요.",
    likeCount: 2,
    isLiked: false,
    comments: [
      {
        id: 7,
        author: {
          name: "맛집탐험가",
          avatarUrl: "",
        },
        content:
          "저는 오늘 회사 근처 새로 생긴 돈까스집에서 먹었어요! 정말 맛있었어요. 개발할 때는 단백질이 풍부한 음식이 좋다고 하더라고요.",
        createdAt: "2025.07.29 12:30",
        likeCount: 4,
        isLiked: false,
        replyCount: 0,
      },
    ],
  },
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

  // 개별 게시글 조회
  http.get("/api/posts/:postId", ({ params }) => {
    const postId = parseInt(params.postId as string, 10);
    const post = POST_DETAIL_DATA.find((p) => p.id === postId);

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(post);
  }),

  // 게시글 댓글 목록
  http.get("/api/posts/:postId/comments", ({ params }) => {
    const postId = parseInt(params.postId as string, 10);
    const post = POST_DETAIL_DATA.find((p) => p.id === postId);

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(post.comments);
  }),

  // 게시글 좋아요 토글
  http.put("/api/posts/:postId/like", ({ params }) => {
    const postId = parseInt(params.postId as string, 10);
    const post = POST_DETAIL_DATA.find((p) => p.id === postId);

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    // 좋아요 상태 토글
    post.isLiked = !post.isLiked;
    post.likeCount += post.isLiked ? 1 : -1;

    return HttpResponse.json({ success: true });
  }),

  // 댓글 추가
  http.post("/api/posts/:postId/comments", async ({ params, request }) => {
    const postId = parseInt(params.postId as string, 10);
    const post = POST_DETAIL_DATA.find((p) => p.id === postId);

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    const body = (await request.json()) as { content: string };
    const newComment: Comment = {
      id: Date.now(),
      author: {
        name: "사용자",
        avatarUrl: "",
      },
      content: body.content,
      createdAt: new Date().toLocaleString("ko-KR"),
      likeCount: 0,
      isLiked: false,
      replyCount: 0,
    };

    post.comments.push(newComment);

    return HttpResponse.json(newComment);
  }),

  // 댓글 답글 목록
  http.get("/api/posts/:postId/comments/:commentId/replies", ({ params }) => {
    const postId = parseInt(params.postId as string, 10);
    const commentId = parseInt(params.commentId as string, 10);
    const post = POST_DETAIL_DATA.find((p) => p.id === postId);

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    const comment = post.comments.find((c) => c.id === commentId);
    if (!comment || !comment.replies) {
      return HttpResponse.json([]);
    }

    return HttpResponse.json(comment.replies);
  }),

  // 답글 추가
  http.post(
    "/api/posts/:postId/comments/:commentId/replies",
    async ({ params, request }) => {
      const postId = parseInt(params.postId as string, 10);
      const commentId = parseInt(params.commentId as string, 10);
      const post = POST_DETAIL_DATA.find((p) => p.id === postId);

      if (!post) {
        return new HttpResponse(null, { status: 404 });
      }

      const comment = post.comments.find((c) => c.id === commentId);
      if (!comment) {
        return new HttpResponse(null, { status: 404 });
      }

      const body = (await request.json()) as { content: string };
      const newReply: Reply = {
        id: Date.now(),
        author: {
          name: "사용자",
          avatarUrl: "",
        },
        content: body.content,
        createdAt: new Date().toLocaleString("ko-KR"),
        likeCount: 0,
        isLiked: false,
      };

      if (!comment.replies) {
        comment.replies = [];
      }
      comment.replies.push(newReply);
      comment.replyCount = comment.replies.length;

      return HttpResponse.json(newReply);
    }
  ),

  // 댓글 좋아요 토글
  http.put("/api/comments/:commentId/like", ({ params }) => {
    const commentId = parseInt(params.commentId as string, 10);

    // 모든 게시글에서 해당 댓글 찾기
    for (const post of POST_DETAIL_DATA) {
      const comment = post.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.isLiked = !comment.isLiked;
        comment.likeCount += comment.isLiked ? 1 : -1;
        return HttpResponse.json({ success: true });
      }
    }

    return new HttpResponse(null, { status: 404 });
  }),

  // 답글 좋아요 토글
  http.put("/api/replies/:replyId/like", ({ params }) => {
    const replyId = parseInt(params.replyId as string, 10);

    // 모든 게시글의 모든 댓글에서 해당 답글 찾기
    for (const post of POST_DETAIL_DATA) {
      for (const comment of post.comments) {
        if (comment.replies) {
          const reply = comment.replies.find((r) => r.id === replyId);
          if (reply) {
            reply.isLiked = !reply.isLiked;
            reply.likeCount += reply.isLiked ? 1 : -1;
            return HttpResponse.json({ success: true });
          }
        }
      }
    }

    return new HttpResponse(null, { status: 404 });
  }),

  // 포지션 목록
  http.get("/api/positions", () => {
    return HttpResponse.json(POSITION_DATA);
  }),

  // 스택 목록
  http.get("/api/stacks", () => {
    return HttpResponse.json(ALL_STACKS);
  }),
];
