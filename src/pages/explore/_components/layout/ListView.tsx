import type { Developer } from "@/types/developer.types";
import { DeveloperProfileCard } from "../DeveloperProfileCard";

interface ListViewProps {
  developers: Developer[];
}

export const ListView = ({ developers }: ListViewProps) => {
  return (
    <div className="space-y-4">
      {developers.map((dev) => (
        <DeveloperProfileCard key={dev.id} developer={dev} viewMode="list" />
      ))}
    </div>
  );
};
