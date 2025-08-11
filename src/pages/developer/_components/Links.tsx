import { Github, Mail, Linkedin, Globe } from "lucide-react";
import type { GetProfileResponse } from "@/types/my.types";

interface SocialLinksProps {
  userProfile?: GetProfileResponse;
}

const SocialLinks = ({ userProfile }: SocialLinksProps) => {
  if (!userProfile) {
    return <div className="text-white">소셜 링크 정보가 없습니다.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">소셜 링크</h3>
        <div className="flex gap-4 justify-center">
          <a
            href={userProfile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 ${
              userProfile.github
                ? "text-brand-text hover:text-white"
                : "text-brand-surface"
            }`}>
            <Github className="size-5" />
          </a>
          <a
            href={`mailto:${userProfile.email}`}
            className={`p-3 ${
              userProfile.email
                ? "text-brand-text hover:text-white"
                : "text-brand-surface"
            }`}>
            <Mail className="size-5" />
          </a>
          <a
            href={userProfile.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 ${
              userProfile.linkedIn
                ? "text-brand-text hover:text-white"
                : "text-brand-surface"
            }`}>
            <Linkedin className="size-5" />
          </a>
          <a
            href={userProfile.blog}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 ${
              userProfile.blog
                ? "text-brand-text hover:text-white"
                : "text-brand-surface"
            }`}>
            <Globe className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
