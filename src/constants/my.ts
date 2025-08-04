export const MENU_ITEMS = [
  { id: "posts", label: "작성한 글" },
  { id: "history", label: "활동 이력" },
  { id: "likes", label: "좋아요 한 글" },
  { id: "bookmarks", label: "북마크" },
] as const;

export type MenuItemId = (typeof MENU_ITEMS)[number]["id"];
