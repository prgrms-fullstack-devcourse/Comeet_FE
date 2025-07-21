import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

export function OnboardingStep4() {
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowText1(true);
    }, 500);

    const timer2 = setTimeout(() => {
      setShowText2(true);
    }, 1300);

    const timer3 = setTimeout(() => {
      setShowButton(true);
    }, 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleSubmit = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] space-y-6">
      
      <h1 className={cn(
        "text-4xl font-bold text-white transition-opacity duration-1000 ease-in-out",
        showText1 ? "opacity-100" : "opacity-0"
      )}>
        환영합니다!
      </h1>

      <p className={cn(
        "text-lg text-gray-300 transition-opacity duration-1000 ease-in-out",
        showText2 ? "opacity-100" : "opacity-0"
      )}>
        CO-MEET와 함께 즐거운 개발 생활 되세요!
      </p>
      
      <div className={cn(
        "w-full pt-8 transition-opacity duration-1000 ease-in-out",
        showButton ? "opacity-100" : "opacity-0"
      )}>
        <Button onClick={handleSubmit} className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold text-lg py-6">
          홈으로
        </Button>
      </div>

    </div>
  );
}