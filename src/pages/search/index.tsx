import { useNavigate } from "react-router-dom";
import RecentSearchList from "@/pages/search/_components/RecentSearchList";
import SearchHeader from "@/pages/search/_components/SearchHeader";
import SearchResults from "@/pages/search/_components/SearchResults";
import { useSearch } from "@/hooks/useSearch";

export default function SearchPage() {
  const navigate = useNavigate();
  const {
    query,
    recentSearches,
    searchResults,
    isLoading,
    isError,
    error,
    hasQueryInput,
    isDebouncing,
    searchQuery,
    setQuery,
    handleSubmit,
    handleRecentSearchClick,
    removeRecentSearch,
  } = useSearch();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-full dark text-foreground bg-brand-background scrollbar-hide ">
      <SearchHeader
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
      <main className="flex-1 overflow-auto">
        {hasQueryInput ? (
          <SearchResults
            posts={searchResults}
            isLoading={isLoading}
            isError={isError}
            error={error}
            query={searchQuery}
            isDebouncing={isDebouncing}
          />
        ) : (
          <RecentSearchList
            searches={recentSearches}
            onSearchClick={handleRecentSearchClick}
            onRemove={removeRecentSearch}
          />
        )}
      </main>
    </div>
  );
}
