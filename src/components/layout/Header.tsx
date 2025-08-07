import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

export default function Header({
  title = "COMEET",
  leftIcon,
  rightIcon,
  onLeftClick,
  onRightClick,
}: HeaderProps) {
  const iconButtonClass =
    "mx-2 text-white hover:bg-brand-surface hover:text-brand-primary cursor-pointer";

  return (
    <header className="w-full border-b border-brand-surface flex items-center justify-between h-14 bg-brand-background">
      <div className="flex items-center w-10">
        {leftIcon && (
          <Button
            variant="ghost"
            onClick={onLeftClick}
            className={iconButtonClass}
            aria-label="좌측 버튼">
            {leftIcon}
          </Button>
        )}
      </div>

      <div className="flex-1 text-center">
        <h1 className="text-white text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center w-10 justify-end">
        {rightIcon && (
          <Button
            variant="ghost"
            onClick={onRightClick}
            className={iconButtonClass}
            aria-label="우측 버튼">
            {rightIcon}
          </Button>
        )}
      </div>
    </header>
  );
}
