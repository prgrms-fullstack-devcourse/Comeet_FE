import type { Developer } from "@/types/developer.types";
import { DeveloperProfileCard } from "../DeveloperProfileCard";

interface GridViewProps {
  developers: Developer[];
}

export const GridView = ({ developers }: GridViewProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {developers.map((dev) => (
        <DeveloperProfileCard key={dev.id} developer={dev} viewMode="grid" />
      ))}
    </div>
  );
};
