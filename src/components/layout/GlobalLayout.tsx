import type { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";
import { useLocation } from "react-router-dom";

interface GlobalLayoutProps {
  children: ReactNode;
}

function GlobalLayout({ children }: GlobalLayoutProps) {
  const location = useLocation();

  const shouldShowBottomNav =
    ["/board", "/explore", "/chat", "/my"].some((path) =>
      location.pathname.startsWith(path)
    ) && !location.pathname.startsWith("/my/edit");

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className={`w-[480px] bg-brand-background flex flex-col h-screen`}>
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </main>
        {shouldShowBottomNav && <BottomNavigation />}
      </div>
    </div>
  );
}

export default GlobalLayout;
