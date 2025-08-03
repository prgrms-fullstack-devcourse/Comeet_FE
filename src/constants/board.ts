export const BOARD_CATEGORY_VALUES = ["all", "1", "2", "3", "4"] as const;

export type UICategory = (typeof BOARD_CATEGORY_VALUES)[number];

export const BOARD_CATEGORIES: {
  value: UICategory;
  label: string;
}[] = [
  { value: "all", label: "전체" },
  { value: "1", label: "자유" },
  { value: "2", label: "질문" },
  { value: "3", label: "프로젝트" },
  { value: "4", label: "모각코" },
];
