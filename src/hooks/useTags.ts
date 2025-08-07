import { useQuery } from "@tanstack/react-query";

export interface TypeDTO {
  id: number;
  value: string;
}

export interface PositionDTO {
  id: number;
  field: string;
  role: string;
}

export interface PositionsAndInterestsResponse {
  positions: PositionDTO[];
  interests: TypeDTO[];
}

const fetchPositionsAndInterests =
  async (): Promise<PositionsAndInterestsResponse> => {
    const res = await fetch("/api/tags/positions-interests");
    if (!res.ok) {
      throw new Error("목록을 불러오는데 실패했습니다.");
    }
    return res.json();
  };

const searchTechs = async (keyword: string): Promise<TypeDTO[]> => {
  if (!keyword) return [];
  const res = await fetch(
    `/api/tags/tech-stack?keyword=${encodeURIComponent(keyword)}`
  );
  if (!res.ok) {
    throw new Error("검색에 실패했습니다.");
  }
  const data = await res.json();
  return data.results;
};

export function usePositionsAndInterests() {
  return useQuery<PositionsAndInterestsResponse, Error>({
    queryKey: ["tags"],
    queryFn: fetchPositionsAndInterests,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
}

export function useTechSearch(keyword: string) {
  return useQuery<TypeDTO[], Error>({
    queryKey: ["techs", keyword],
    queryFn: () => searchTechs(keyword),
    enabled: !!keyword,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
