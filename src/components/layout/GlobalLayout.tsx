import type { ReactNode } from "react";

interface GlobalLayoutProps {
  children: ReactNode
}

function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-[480px] bg-white flex flex-col">
        <header className="w-full border-b border-border h-14">
        </header>
        <main className="flex-grow p-4">
          {children}
        </main>
        <footer className="w-full  border-t border-border h-14">
        </footer>
      </div>
    </div >
  );
};

export default GlobalLayout;