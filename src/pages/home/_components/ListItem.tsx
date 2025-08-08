import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Post } from "@/types/post.types";

interface ListItemProps {
  post: Post;
}

export const ListItem = ({ post }: ListItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/community/${post.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card
      className="bg-brand-surface border-none text-white hover:bg-brand-surface/50 transition-colors cursor-pointer"
      onClick={handleClick}>
      <CardHeader>
        <Badge className="w-fit p-0 text-left bg-transparent border-none text-brand-primary">
          {post.board.value}
        </Badge>
        <CardTitle className="mt-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center text-xs text-brand-text">
        <span>
          {post.author.nickname} · {formatDate(post.createdAt)}
        </span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Heart className="size-4" aria-label="좋아요" />
            <span className="w-3">{post.nLikes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="size-4" aria-label="댓글" />
            <span className="w-3">{post.nComments}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
