import type { ReactNode } from "react";

interface GlobalLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  variant?: 'white' | 'black';
}

function GlobalLayout({
  children,
  showHeader = true,
  showFooter = true,
  variant = 'white',
}: GlobalLayoutProps) {
  const backgroundClass = variant === 'black' ? 'bg-brand-background' : 'bg-white';
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className={`w-[480px] ${backgroundClass} flex flex-col`}>
        {showHeader && (
          <header className="w-full border-b border-border h-14">
          </header>
        )}
        <main className="flex-1 p-4">
          {children}
        </main>
        {showFooter && (
          <footer className="w-full border-t border-border h-14">
          </footer>
        )}
      </div>
    </div >
  );
};

export default GlobalLayout;