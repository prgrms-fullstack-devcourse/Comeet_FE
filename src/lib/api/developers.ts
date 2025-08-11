import type { NearbyUser, NearbyUsersParams } from "@/types/developer.types";
import type { ExploreTabValue } from "@/constants/explore";
import { createApiUrl, createAuthHeaders } from "./config";

export const fetchDevelopers = async (
  category: ExploreTabValue,
  filterParams?: Partial<NearbyUsersParams>
): Promise<NearbyUser[]> => {
  let url: string;

  switch (category) {
    case "nearby":
      const searchParams = new URLSearchParams();
      const radius = filterParams?.radius || 10;
      searchParams.append("radius", radius.toString());

      if (filterParams?.positionIds?.length) {
        filterParams.positionIds.forEach((id) => {
          searchParams.append("positionIds", id.toString());
        });
      }
      if (filterParams?.techIds?.length) {
        filterParams.techIds.forEach((id) => {
          searchParams.append("techIds", id.toString());
        });
      }
      if (filterParams?.interestIds?.length) {
        filterParams.interestIds.forEach((id) => {
          searchParams.append("interestIds", id.toString());
        });
      }

      url = `${createApiUrl("/users/search/near")}?${searchParams.toString()}`;
      if (filterParams?.age) {
        const cleanAge = filterParams.age.trim();
        url += `&age=${cleanAge}`;
      }
      if (filterParams?.experience) {
        const cleanExperience = filterParams.experience.trim();
        url += `&experience=${cleanExperience}`;
      }
      break;
    case "popular":
      url = `${createApiUrl("/users/search/hot")}`;
      break;
    case "favorite":
      url = `${createApiUrl("/users/search/subscriptions")}`;
      break;
    default:
      throw new Error(`알 수 없는 카테고리입니다: ${category}`);
  }

  const response = await fetch(url, {
    headers: createAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `개발자 목록을 불러오는 데 실패했습니다: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.results || [];
};

export const fetchUserProfile = async (nickname: string): Promise<any> => {
  const url = `${createApiUrl(`/users/${nickname}`)}`;
  const headers = createAuthHeaders();

  const response = await fetch(url, {
    headers,
  });

  console.log("📡 User Profile Response:", {
    nickname,
    status: response.status,
    statusText: response.statusText,
  });

  if (!response.ok) {
    throw new Error(
      `프로필을 불러오는 데 실패했습니다: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
};

export const toggleUserSubscription = async (
  nickname: string
): Promise<{
  nSubscribers: number;
  subscribing: boolean;
}> => {
  const url = `${createApiUrl(`/users/${nickname}/subscriptions`)}`;
  const headers = createAuthHeaders();

  const response = await fetch(url, {
    method: "PUT",
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `구독 상태 변경에 실패했습니다: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
};
