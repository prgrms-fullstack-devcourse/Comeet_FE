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
import AuthCallbackPage from "./pages/auth/AuthCallbackPage.tsx";
import { OnboardingPage } from "./pages/onboarding/OnboardingPage.tsx";
import { PostDetailPage } from "./pages/community/PostDetailPage.tsx";

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

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser.ts");
    return worker.start();
  }
}

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
        path: "board/:category",
        element: <BoardPage />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
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
        path: "community", // 이 경로는 /community가 아닌 /community/:id 일 수 있습니다. 확인이 필요합니다.
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
    ],
  },
  {
    path: "/callback",
    element: <AuthCallbackPage />,
  },
]);

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
});

/*
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
*/