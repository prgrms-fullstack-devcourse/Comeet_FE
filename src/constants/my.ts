export const MENU_ITEMS = [
  { id: "posts", label: "작성한 글" },
  { id: "history", label: "활동 이력" },
  { id: "comments", label: "내가 쓴 댓글" },
  { id: "bookmarks", label: "북마크" },
  { id: "logout", label: "로그아웃" },
  { id: "delete", label: "계정 삭제", isDestructive: true },
] as const;

export type MenuItemId = (typeof MENU_ITEMS)[number]["id"];
