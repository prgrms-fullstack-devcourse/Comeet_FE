import { useState } from "react";
import { OnboardingStep1 } from "@/pages/onboarding/__components/OnboardingStep1";
import { OnboardingStep2 } from "@/pages/onboarding/__components/OnboardingStep2";
import { OnboardingStep3 } from "@/pages/onboarding/__components/OnboardingStep3";
import { OnboardingStep4 } from "@/pages/onboarding/__components/OnboardingStep4";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateUserProfile } from "@/hooks/useOnboarding";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface OnboardingData {
  nickname?: string;
  age?: number;
  experience?: number;
  bio?: string;
  position?: number;
  techStack?: number[];
  interests?: number[];
  linkedIn?: string;
  email?: string;
  instagram?: string;
  blog?: string;
  location?: Coordinates;
}

export function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>(
    {}
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { mutate: updateUserProfile, isPending } = useUpdateUserProfile();

  const TOTAL_STEPS = 4;

  const handleNext = (currentStepData: Partial<OnboardingData>) => {
    if (step > TOTAL_STEPS) return; // step 범위 체크
    setErrorMsg(null);

    const newData = { ...onboardingData, ...currentStepData };
    setOnboardingData(newData);

    if (step < TOTAL_STEPS - 1) {
      setStep((prev) => prev + 1);
    } else {
      updateUserProfile(newData as OnboardingData, {
        onSuccess: () => {
          setStep(TOTAL_STEPS);
        },
        onError: () => {
          setErrorMsg("프로필 저장에 실패했습니다. 다시 시도해주세요.");
        },
      });
    }
  };

  const progress = Math.min((step / TOTAL_STEPS) * 100, 100);

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "프로필 설정";
      case 2:
        return "기술 / 관심 분야";
      case 3:
        return "추가 정보";
      case 4:
        return "";
      default:
        return "프로필 설정";
    }
  };

  return (
    <div className="w-full pt-8">
      {step < TOTAL_STEPS && (
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div
            className="bg-lime-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <Card className="bg-transparent border-none text-white">
        {step < TOTAL_STEPS && (
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {getStepTitle()}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent>
          {errorMsg && (
            <div className="mb-4 text-red-500 text-sm">{errorMsg}</div>
          )}
          {step === 1 && (
            <OnboardingStep1 onNext={handleNext} data={onboardingData} />
          )}
          {step === 2 && (
            <OnboardingStep2 onNext={handleNext} data={onboardingData} />
          )}
          {step === 3 && (
            <OnboardingStep3
              onNext={handleNext}
              data={onboardingData}
              isPending={isPending}
            />
          )}
          {step === 4 && <OnboardingStep4 />}
        </CardContent>
      </Card>
    </div>
  );
}
