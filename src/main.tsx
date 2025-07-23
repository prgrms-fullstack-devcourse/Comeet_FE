import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { LoginPage } from "./pages/auth/LoginPage.tsx";
import { BoardPage } from "./pages/home/index.tsx";
import { ExplorePage } from "./pages/explore/index.tsx";

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
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
