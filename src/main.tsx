import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { LoginPage } from "./pages/auth/LoginPage.tsx";
import { BoardPage } from "./pages/home/index.tsx";
import { MyPage } from "./pages/my/index.tsx";
import { DeveloperPage } from "./pages/developer/index.tsx";
import { ExplorePage } from "./pages/explore/index.tsx";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
import { OnboardingPage } from "./pages/onboarding/OnboardingPage.tsx";
import { PostDetailPage } from "./pages/community/PostDetailPage.tsx";

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
        path: "community",
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
