import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyProfile, updateMyProfile } from "@/lib/api/my";
import type { UpdateProfileRequest } from "@/types/my.types";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: fetchMyProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
};
