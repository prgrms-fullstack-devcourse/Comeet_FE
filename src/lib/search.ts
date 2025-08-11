const RECENT_SEARCHES_KEY = "recent_searches";

export const loadRecentSearches = (): string[] => {
  try {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("최근 검색어 로드 실패:", error);
    return [];
  }
};

export const saveRecentSearches = (searches: string[]): void => {
  try {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
  } catch (error) {
    console.error("최근 검색어 저장 실패:", error);
  }
};

export const addRecentSearch = (
  searchTerm: string,
  currentSearches: string[]
): string[] => {
  const trimmedSearch = searchTerm.trim();
  if (!trimmedSearch) return currentSearches;

  const filtered = currentSearches.filter((item) => item !== trimmedSearch);
  const updated = [trimmedSearch, ...filtered].slice(0, 10);

  saveRecentSearches(updated);
  return updated;
};

export const removeRecentSearch = (
  index: number,
  currentSearches: string[]
): string[] => {
  const updated = currentSearches.filter((_, i) => i !== index);
  saveRecentSearches(updated);
  return updated;
};

export const isValidSearchQuery = (query: string): boolean => {
  return query.trim().length >= 2;
};
