import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Tab {
  value: string;
  label: string;
}

interface AppTabsProps {
  tabs: readonly Tab[];
  value: string;
  onValueChange: (value: string) => void;
  listClassName?: string;
  triggerClassName?: string;
  className?: string;
}

export const AppTabs = ({
  tabs,
  value,
  onValueChange,
  listClassName,
  triggerClassName,
  className,
}: AppTabsProps) => {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={cn(className)}>
      <TabsList
        className={cn(
          "grid w-full bg-brand-background rounded-none p-0 border-b-2 border-brand-surface",
          listClassName
        )}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value.toString()}
            className={cn(
              "relative rounded-none text-muted-foreground",
              "after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px]",
              "data-[state=active]:text-brand-primary data-[state=active]:after:bg-brand-primary",
              triggerClassName
            )}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
