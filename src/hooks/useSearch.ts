import { useState, useEffect } from "react";
import { useSearchPosts } from "@/hooks/queries/usePosts";
import { useDebounce } from "@/hooks/useDebounce";
import {
  loadRecentSearches,
  addRecentSearch,
  removeRecentSearch as removeSearch,
  isValidSearchQuery,
} from "@/lib/search";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [manualSearch, setManualSearch] = useState("");

  const debouncedQuery = useDebounce(query, 1000);
  const searchQuery = manualSearch || debouncedQuery;

  const {
    data: searchResults = [],
    isLoading,
    isError,
    error,
  } = useSearchPosts(searchQuery);

  useEffect(() => {
    setRecentSearches(loadRecentSearches());
  }, []);

  const saveRecentSearch = (searchTerm: string) => {
    setRecentSearches((prev) => addRecentSearch(searchTerm, prev));
  };

  const handleRemoveRecentSearch = (index: number) => {
    setRecentSearches((prev) => removeSearch(index, prev));
  };

  useEffect(() => {
    if (isValidSearchQuery(debouncedQuery)) {
      saveRecentSearch(debouncedQuery.trim());
      if (manualSearch) {
        setManualSearch("");
      }
    }
  }, [debouncedQuery, manualSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setManualSearch(query.trim());
      saveRecentSearch(query.trim());
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    setManualSearch(search);
    saveRecentSearch(search);
  };

  const hasSearchResults = searchQuery.trim().length > 0;
  const hasQueryInput = query.trim().length > 0;
  const isDebouncing =
    hasQueryInput && query.trim() !== debouncedQuery.trim() && !manualSearch;

  return {
    query,
    recentSearches,
    searchResults,
    isLoading,
    isError,
    error,
    hasSearchResults,
    hasQueryInput,
    isDebouncing,
    searchQuery: hasSearchResults ? searchQuery : query,
    setQuery,
    handleSubmit,
    handleRecentSearchClick,
    removeRecentSearch: handleRemoveRecentSearch,
  };
};
