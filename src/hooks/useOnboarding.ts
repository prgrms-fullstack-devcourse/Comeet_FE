import { useMutation } from "@tanstack/react-query";
import type {
  OnboardingData,
  Coordinates,
} from "@/pages/onboarding/OnboardingPage";

interface SignUpPayload {
  nickname?: string;
  age?: number;
  experience?: number;
  bio?: string;
  location?: Coordinates;
  positionId?: number;
  techIds?: number[];
  interestIds?: number[];
  linkedIn?: string;
  email?: string;
  instagram?: string;
  blog?: string;
}

const signUpUserProfile = async (data: OnboardingData) => {
  const sessionId = sessionStorage.getItem("signUpSessionId");
  if (!sessionId) {
    throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
  }

  const payload: SignUpPayload = {
    nickname: data.nickname,
    age: data.age,
    experience: data.experience,
    bio: data.bio,
    location: data.location,
    positionId: data.position,
    techIds: data.techStack,
    interestIds: data.interests,
    linkedIn: data.linkedIn,
    email: data.email,
    instagram: data.instagram,
    blog: data.blog,
  };

  Object.keys(payload).forEach((key) => {
    const value = payload[key as keyof SignUpPayload];
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value === "")
    ) {
      delete payload[key as keyof SignUpPayload];
    }
  });

  const res = await fetch(`/api/auth/sign-up?sessionId=${sessionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errorMsg = "프로필 등록에 실패했습니다.";
    try {
      const errorData = await res.json();
      errorMsg = Array.isArray(errorData.message)
        ? errorData.message[0]
        : errorData.message;
    } catch {}
    throw new Error(errorMsg);
  }

  if (res.status === 204 || res.status === 205) {
    return;
  }

  return res.json();
};

export function useUpdateUserProfile() {
  return useMutation<any, Error, OnboardingData>({
    mutationFn: signUpUserProfile,
    onSuccess: () => {
      sessionStorage.removeItem("signUpSessionId");
    },
    onError: (error) => {
      throw error;
    },
  });
}
