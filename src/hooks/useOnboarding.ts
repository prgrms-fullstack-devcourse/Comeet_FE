import { useMutation } from "@tanstack/react-query";
import type { OnboardingData } from "@/pages/onboarding/OnboardingPage";

interface UpdateUserPayload {
  nickname?: string;
  age?: number;
  experience?: number;
  bio?: string;
  positionId?: number;
  techIds?: number[];
  interestIds?: number[];
  linkedIn?: string;
  email?: string;
  instagram?: string;
  blog?: string;
}

const TEST_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ2l0aHViSWQiOiIxMzA2NzUxMzQiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTAwMDAwMDAwMDAwMDAwMDB9.uwQg26GHjxwskdZGI39zPx1zfIUhZZMokqOXlEnTsqc";

const updateUserProfile = async (data: OnboardingData) => {
  const payload: UpdateUserPayload = {
    nickname: data.nickname,
    age: data.age,
    experience: data.experience,
    bio: data.bio,
    positionId: data.position,
    techIds: data.techStack,
    interestIds: data.interests,
    linkedIn: data.linkedIn,
    email: data.email,
    instagram: data.instagram,
    blog: data.blog,
  };

  Object.keys(payload).forEach((key) => {
    const typedKey = key as keyof UpdateUserPayload;
    if (
      payload[typedKey] === undefined ||
      payload[typedKey] === null ||
      payload[typedKey] === ""
    ) {
      delete payload[typedKey];
    }
  });

  const res = await fetch(`/api/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errorMsg = "프로필 업데이트에 실패했습니다.";
    try {
      const errorData = await res.json();
      if (Array.isArray(errorData.message)) {
        errorMsg = errorData.message[0];
      } else if (typeof errorData.message === "string") {
        errorMsg = errorData.message;
      }
    } catch {}
    throw new Error(errorMsg);
  }

  if (res.status === 204 || res.status === 205) {
    return;
  }
  return res.json();
};

export function useUpdateUserProfile() {
  return useMutation<void, Error, OnboardingData>({
    mutationFn: updateUserProfile,
    onSuccess: () => {},
    onError: (error) => {
      throw error;
    },
  });
}
