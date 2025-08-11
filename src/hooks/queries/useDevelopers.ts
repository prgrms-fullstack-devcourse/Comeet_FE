import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDevelopers,
  fetchUserProfile,
  toggleUserSubscription,
} from "@/lib/api/developers";
import type { NearbyUser, NearbyUsersParams } from "@/types/developer.types";
import type { ExploreTabValue } from "@/constants/explore";

export const useDevelopers = (
  category: ExploreTabValue,
  enabled: boolean = true,
  filterParams?: Partial<NearbyUsersParams>
) => {
  return useQuery<NearbyUser[]>({
    queryKey: ["developers", category, filterParams],
    queryFn: () => fetchDevelopers(category, filterParams),
    enabled,
  });
};

export const useUserProfile = (nickname: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["userProfile", nickname],
    queryFn: () => fetchUserProfile(nickname),
    enabled: enabled && !!nickname,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useToggleUserSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleUserSubscription,
    onSuccess: (data, nickname) => {
      queryClient.setQueryData(["userProfile", nickname], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            nSubscribers: data.nSubscribers,
            subscribing: data.subscribing,
          };
        }
        return oldData;
      });
    },
  });
};
