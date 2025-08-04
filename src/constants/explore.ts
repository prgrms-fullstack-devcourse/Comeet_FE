export const EXPLORE_TABS = [
  { value: "nearby", label: "주변" },
  { value: "popular", label: "인기" },
  { value: "favorite", label: "관심" },
] as const;

export type ExploreTabValue = (typeof EXPLORE_TABS)[number]["value"];
