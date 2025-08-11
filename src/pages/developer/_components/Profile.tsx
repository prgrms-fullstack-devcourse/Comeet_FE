import { Badge } from "@/components/ui/badge";
import type { GetProfileResponse } from "@/types/my.types";

interface ProfileProps {
  userProfile?: GetProfileResponse;
}

const Profile = ({ userProfile }: ProfileProps) => {
  if (!userProfile) {
    return <div className="text-white">프로필 정보가 없습니다.</div>;
  }

  return (
    <div className="space-y-6 overflow-hidden">
      {/* Bio */}
      {userProfile.bio && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">소개</h3>
          <p className="text-brand-text text-sm leading-relaxed whitespace-pre-wrap">
            {userProfile.bio}
          </p>
        </div>
      )}

      {/* 경력 */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">경력</h3>
        <p className="text-brand-text text-sm">{userProfile.experience}년</p>
      </div>

      {/* 테크스택 */}
      {userProfile.techStack && userProfile.techStack.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">기술 스택</h3>
          <div className="flex flex-wrap gap-2 overflow-hidden">
            {userProfile.techStack.map((tech, index) => (
              <Badge
                key={`${tech.id}-${index}`}
                variant="outline"
                className="rounded-full bg-brand-surface border-brand-primary text-brand-primary text-xs">
                {tech.value}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* 관심사 */}
      {userProfile.interests && userProfile.interests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">관심사</h3>
          <div className="flex flex-wrap gap-2 overflow-hidden">
            {userProfile.interests.map((interest, index) => (
              <Badge
                key={`${interest.id}-${index}`}
                variant="outline"
                className="rounded-full bg-brand-surface border-brand-primary text-brand-primary text-xs">
                {interest.value}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
