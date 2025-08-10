import type {
  GetProfileResponse,
  UpdateProfileRequest,
} from "@/types/my.types";
import { createApiUrl, createAuthHeaders } from "./config";

export const fetchMyProfile = async (): Promise<GetProfileResponse> => {
  const url = `${createApiUrl("/users")}`;
  const headers = createAuthHeaders();
  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `프로필을 불러오는 데 실패했습니다: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  return data;
};

export const updateMyProfile = async (
  data: UpdateProfileRequest
): Promise<void> => {
  const url = `${createApiUrl("/users")}`;
  const headers = createAuthHeaders();
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `프로필 수정에 실패했습니다: ${response.status} ${response.statusText}`
    );
  }
};
