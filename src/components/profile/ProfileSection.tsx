import { Button } from "@/components/ui/button";
import type { GetProfileResponse } from "@/types/my.types";

interface ProfileSectionProps {
  profile?: GetProfileResponse;
  isEditable?: boolean;
  onEditClick?: () => void;
}

export const ProfileSection = ({
  profile,
  onEditClick,
}: ProfileSectionProps) => {
  const displayImage = profile?.avatar;
  const displayName = profile?.nickname || "이름";
  const displayInfo = profile
    ? `${profile.age}세 · ${profile.position?.role || "포지션"}`
    : "나이 · 포지션";

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-brand-primary flex items-center justify-center overflow-hidden">
          {displayImage ? (
            <img
              src={displayImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-brand-primary flex items-center justify-center">
              <span className="text-brand-background text-2xl font-bold">
                {displayName.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-4 text-white">{displayName}</h2>
      <p className="text-brand-text mt-1">{displayInfo}</p>
      <Button
        variant="outline"
        onClick={onEditClick}
        className="mt-4 bg-transparent border-brand-surface text-white hover:bg-brand-surface/50 hover:text-white">
        프로필 설정
      </Button>
    </div>
  );
};
