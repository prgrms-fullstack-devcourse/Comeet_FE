import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-[480px] bg-brand-background flex flex-col p-8">
        {children}
      </div>
    </div>
  );
}