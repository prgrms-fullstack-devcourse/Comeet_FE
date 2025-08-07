import { useFunnel } from "@use-funnel/react-router-dom";
import { OnboardingStep1 } from "@/pages/onboarding/_components/OnboardingStep1";
import { OnboardingStep2 } from "@/pages/onboarding/_components/OnboardingStep2";
import { OnboardingStep3 } from "@/pages/onboarding/_components/OnboardingStep3";
import { OnboardingStep4 } from "@/pages/onboarding/_components/OnboardingStep4";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import { ArrowLeft } from "lucide-react";

type ProfileSetup = {
  nickname?: string;
  age?: number;
  experience?: number;
  bio?: string;
  location?: {
    lng: number;
    lat: number;
  };
};

type TechInterests = {
  nickname: string;
  age: number;
  experience: number;
  bio: string;
  location: {
    lng: number;
    lat: number;
  };
  position?: number;
  techStack?: number[];
  interests?: number[];
};

type AdditionalInfo = {
  nickname: string;
  age: number;
  experience: number;
  bio: string;
  location: {
    lng: number;
    lat: number;
  };
  position: number;
  techStack: number[];
  interests: number[];
  linkedin?: string;
  email?: string;
  instagram?: string;
  blog?: string;
};

type Complete = {
  nickname: string;
  age: number;
  experience: number;
  bio: string;
  location: {
    lng: number;
    lat: number;
  };
  position: number;
  techStack: number[];
  interests: number[];
  linkedin?: string;
  email?: string;
  instagram?: string;
  blog?: string;
};

export interface OnboardingData {
  nickname?: string;
  age?: number;
  experience?: number;
  bio?: string;
  location?: {
    lng: number;
    lat: number;
  };
  position?: number;
  techStack?: number[];
  interests?: number[];
  linkedin?: string;
  email?: string;
  instagram?: string;
  blog?: string;
}

export function OnboardingPage() {
  const funnel = useFunnel<{
    ProfileSetup: ProfileSetup;
    TechInterests: TechInterests;
    AdditionalInfo: AdditionalInfo;
    Complete: Complete;
  }>({
    id: "onboarding",
    initial: {
      step: "ProfileSetup",
      context: {},
    },
  });

  const getStepTitle = () => {
    switch (funnel.step) {
      case "ProfileSetup":
        return "프로필 설정";
      case "TechInterests":
        return "기술 / 관심 분야";
      case "AdditionalInfo":
        return "추가 정보";
      case "Complete":
      default:
        return "";
    }
  };

  const getProgress = () => {
    const stepOrder = [
      "ProfileSetup",
      "TechInterests",
      "AdditionalInfo",
      "Complete",
    ];
    const currentIndex = stepOrder.indexOf(funnel.step);
    return ((currentIndex + 1) / stepOrder.length) * 100;
  };

  const canGoBack =
    funnel.step !== "ProfileSetup" && funnel.step !== "Complete";

  const handleBack = () => {
    if (canGoBack) {
      funnel.history.back();
    }
  };

  return (
    <div>
      <Header
        title="COMEET"
        leftIcon={canGoBack ? <ArrowLeft /> : undefined}
        onLeftClick={canGoBack ? handleBack : undefined}
      />
      <div className="w-full pt-22">
        {funnel.step !== "Complete" && (
          <div className="bg-brand-surface rounded-full h-2 mb-4 mx-6">
            <div
              className="bg-brand-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        )}
        <Card className="bg-transparent border-none text-white">
          {funnel.step !== "Complete" && (
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {getStepTitle()}
              </CardTitle>
            </CardHeader>
          )}
          <CardContent>
            <funnel.Render
              ProfileSetup={({ history }) => (
                <OnboardingStep1
                  onNext={(data) => {
                    if (
                      data.nickname &&
                      data.age &&
                      data.experience &&
                      data.bio &&
                      data.location
                    ) {
                      history.push("TechInterests", (prev) => ({
                        ...prev,
                        nickname: data.nickname!,
                        age: data.age!,
                        experience: data.experience!,
                        bio: data.bio!,
                        location: data.location!,
                      }));
                    }
                  }}
                  data={funnel.context}
                />
              )}
              TechInterests={({ context, history }) => (
                <OnboardingStep2
                  onNext={(data) => {
                    if (data.position && data.techStack && data.interests) {
                      history.push("AdditionalInfo", (prev) => ({
                        ...prev,
                        position: data.position!,
                        techStack: data.techStack!,
                        interests: data.interests!,
                      }));
                    }
                  }}
                  data={context}
                />
              )}
              AdditionalInfo={({ context, history }) => (
                <OnboardingStep3
                  onNext={(data) => {
                    history.push("Complete", (prev) => ({
                      ...prev,
                      ...data,
                    }));
                  }}
                  data={context}
                />
              )}
              Complete={() => <OnboardingStep4 />}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
