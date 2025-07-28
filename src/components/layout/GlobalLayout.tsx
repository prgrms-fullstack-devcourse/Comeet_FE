import type { ReactNode } from "react";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";

interface GlobalLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showBottomNavigation?: boolean;
  headerTitle?: string;
}

function GlobalLayout({
  children,
  showHeader = true,
  showBottomNavigation = true,
  headerTitle
}: GlobalLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className={`w-[480px] bg-brand-background flex flex-col`}>
        {showHeader && <Header title={headerTitle} />}
        <main className="flex-1 p-4">
          {children}
        </main>
        {showBottomNavigation && <BottomNavigation />}
      </div>
    </div >
  );
};

export default GlobalLayout;