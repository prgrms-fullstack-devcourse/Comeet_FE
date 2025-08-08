import { useQuery } from "@tanstack/react-query";
import { fetchStacks, fetchPositionsInterests } from "@/lib/api/tags";
import type { Stack, PositionsInterestsResponse } from "@/types/tags.types";

export const useStacks = (keyword: string = "") => {
  return useQuery<Stack[]>({
    queryKey: ["stacks", keyword],
    queryFn: () => fetchStacks(keyword),
  });
};

export const usePositionsInterests = () => {
  return useQuery<PositionsInterestsResponse>({
    queryKey: ["positions-interests"],
    queryFn: fetchPositionsInterests,
  });
};
