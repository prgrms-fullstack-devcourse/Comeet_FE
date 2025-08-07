import type { Developer } from "@/types/developer.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DeveloperProfileCardProps {
  developer: Developer;
  viewMode: "list" | "grid";
}

export const DeveloperProfileCard = ({
  developer,
  viewMode,
}: DeveloperProfileCardProps) => {
  if (viewMode === "grid") {
    return (
      <div className="text-white">
        <div className="w-full bg-yellow-400 rounded-lg aspect-square mb-2">
          {/* 이미지 영역 */}
        </div>
        <div className="flex justify-between items-baseline">
          <span className="font-semibold text-sm truncate">
            {developer.nickname}
          </span>
          <span className="text-xs text-brand-text">{developer.distance}</span>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-brand-surface border-none text-white hover:bg-brand-surface/50 transition-colors h-32">
      <div className="flex items-center h-full px-4">
        <div className="w-24 h-24 bg-yellow-400 rounded-lg shrink-0 mr-4"></div>
        <div className="flex-1 flex flex-col justify-center">
          <CardHeader className="p-0">
            <div className="flex justify-between items-baseline">
              <CardTitle className="text-lg">{developer.nickname}</CardTitle>
              <span className="text-sm text-brand-text">
                {developer.distance}
              </span>
            </div>
            <div className="flex items-center text-sm text-brand-text pt-1 gap-1.5">
              <span>{developer.position}</span>
              <span className="text-xs">·</span>
              <span>{developer.experience}</span>
            </div>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <div className="flex flex-wrap gap-2">
              {developer.stacks.map((stack, index) => (
                <Badge
                  key={`${stack}-${index}`}
                  variant="outline"
                  className="rounded-full bg-brand-surface border-brand-primary text-brand-primary">
                  {stack}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
