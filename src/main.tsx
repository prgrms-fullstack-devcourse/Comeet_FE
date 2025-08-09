import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { LoginPage } from "./pages/auth/LoginPage.tsx";
import { BoardPage } from "./pages/home/index.tsx";
import { MyPage } from "./pages/my/index.tsx";
import { DeveloperPage } from "./pages/developer/index.tsx";
import { ExplorePage } from "./pages/explore/index.tsx";
import { OnboardingPage } from "./pages/onboarding/index.tsx";
import { PostDetailPage } from "./pages/community/index.tsx";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage.tsx";
import ChatPage from "./pages/chat/index.tsx";
import SearchPage from "./pages/search/index.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 2,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <BoardPage />,
      },
      {
        path: "board",
        element: <BoardPage />,
      },
      {
        path: "board/:category",
        element: <BoardPage />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "my",
        element: <MyPage />,
      },
      {
        path: "developer/:id",
        element: <DeveloperPage />,
      },
      {
        path: "community/:postId",
        element: <PostDetailPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "onboarding",
        element: <OnboardingPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
  {
    path: "/callback",
    element: <AuthCallbackPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
