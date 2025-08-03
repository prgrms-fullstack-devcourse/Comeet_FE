import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle } from "lucide-react";
import type { Post } from "@/types/board";
import { BOARD_CATEGORIES } from "@/constants/board";

interface ListItemProps {
  post: Post;
}

export const ListItem = ({ post }: ListItemProps) => {
  const categoryLabel =
    BOARD_CATEGORIES.find((c) => c.value === post.categoryId.toString())
      ?.label || "";

  return (
    <Card className="bg-brand-surface border-none text-white hover:bg-brand-surface/50 transition-colors">
      <CardHeader>
        <Badge className="w-fit p-0 text-left bg-transparent border-none text-brand-primary">
          {categoryLabel}
        </Badge>
        <CardTitle className="mt-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center text-xs text-brand-text">
        <span>
          {post.author} · {post.date}
        </span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Heart className="size-4" aria-label="좋아요" />
            <span className="w-3">{post.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="size-4" aria-label="댓글" />
            <span className="w-3">{post.comments}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
