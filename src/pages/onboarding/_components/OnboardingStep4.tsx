import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSignUp } from "@/hooks/queries/useAuth";
import type { OnboardingData } from "../index";

interface StepProps {
  data: OnboardingData;
}

export function OnboardingStep4({ data }: StepProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const signUpMutation = useSignUp();

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

  const handleSubmit = async () => {
    try {
      const sessionId = searchParams.get("sessionId");

      if (!sessionId) {
        navigate("/login");
        return;
      }

      if (
        !data.nickname ||
        !data.age ||
        !data.experience ||
        !data.bio ||
        !data.location ||
        !data.position ||
        !data.techStack ||
        !data.interests
      ) {
        console.error("온보딩 데이터가 불완전합니다:", {
          nickname: data.nickname,
          age: data.age,
          experience: data.experience,
          bio: data.bio,
          location: data.location,
          position: data.position,
          techStack: data.techStack,
          interests: data.interests,
        });
        return;
      }

      const requestData = {
        nickname: data.nickname,
        age: data.age,
        experience: data.experience,
        bio: data.bio,
        location: {
          lng: data.location.lng,
          lat: data.location.lat,
        },
        positionId: data.position,
        techIds: data.techStack,
        interestIds: data.interests,
        ...(data.email && { email: data.email }),
        ...(data.instagram && { instagram: data.instagram }),
        ...(data.linkedin && { linkedIn: data.linkedin }),
        ...(data.blog && { blog: data.blog }),
      };

      await signUpMutation.mutateAsync({
        sessionId,
        data: requestData,
      });
      navigate("/board");
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] space-y-6">
      <h1
        className={cn(
          "text-4xl font-bold text-white transition-opacity duration-1000 ease-in-out",
          showText1 ? "opacity-100" : "opacity-0"
        )}>
        환영합니다!
      </h1>

      <p
        className={cn(
          "text-lg text-gray-300 transition-opacity duration-1000 ease-in-out",
          showText2 ? "opacity-100" : "opacity-0"
        )}>
        CO-MEET과 함께 즐거운 개발 생활 되세요!
      </p>

      <div
        className={cn(
          "w-full pt-8 transition-opacity duration-1000 ease-in-out",
          showButton ? "opacity-100" : "opacity-0"
        )}>
        <Button
          onClick={handleSubmit}
          disabled={signUpMutation.isPending}
          className="w-full bg-brand-primary hover:bg-brand-primary/80 text-black font-bold text-lg py-6">
          {signUpMutation.isPending ? "처리 중..." : "홈으로"}
        </Button>
      </div>
    </div>
  );
}
