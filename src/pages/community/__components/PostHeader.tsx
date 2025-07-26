import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark } from "lucide-react";

interface PostHeaderProps {
  onBookmarkClick: () => void;
}

export function PostHeader({ onBookmarkClick }: PostHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between w-full h-14 px-4">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={() => navigate(-1)}
        className="h-10 w-10 rounded-md flex items-center justify-center cursor-pointer hover:bg-accent"
      >
        <ArrowLeft className="h-6 w-6 text-white" />
      </button>

      <button
        type="button"
        aria-label="북마크"
        onClick={onBookmarkClick}
        className="h-10 w-10 rounded-md flex items-center justify-center cursor-pointer hover:bg-accent"
      >
        <Bookmark className="h-6 w-6 text-white" />
      </button>
    </header>
  );
}
