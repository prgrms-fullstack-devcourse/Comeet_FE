import { useState } from "react";
import RecentSearchList from "@/pages/search/_components/RecentSearchList";
import SearchHeader from "@/pages/search/_components/SearchHeader";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "이전 검색 결과 1",
    "이전 검색 결과 2",
    "이전 검색 결과 3",
  ]);

  const handleRemoveSearch = (index: number) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // TODO: 실제 검색 API 연동 후 검색 결과 페이지로 이동 또는 결과 표시
      console.log("검색:", query);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <SearchHeader
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
        // TODO: React Router useNavigate 훅 추가 후 navigate(-1) 기능 구현
        onBack={() => {}}
      />
      <main className="flex-1 overflow-auto">
        <RecentSearchList
          searches={recentSearches}
          onSearchClick={setQuery}
          onRemove={handleRemoveSearch}
        />
      </main>
    </div>
  );
}
