export const DEVELOPER_TABS = [
  {
    value: "profile",
    label: "프로필",
  },
  {
    value: "posts",
    label: "작성한 글 ",
  },
] as const;

export type DeveloperTabValue = (typeof DEVELOPER_TABS)[number]["value"];
