import type { ApplicantResponse } from "@/types/post.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ApplicantSectionProps {
  applicants: ApplicantResponse[];
}

export function ApplicantSection({ applicants }: ApplicantSectionProps) {
  const totalApplicants = applicants.length;

  return (
    <div className="p-4 pb-0 flex flex-col text-white">
      <h3 className="text-sm font-semibold mb-3">지원자 {totalApplicants}</h3>

      <div className="flex flex-col gap-3">
        {applicants.length > 0 ? (
          applicants.map((applicant, index) => (
            <div key={index} className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={applicant.avatar} alt={applicant.nickname} />
                <AvatarFallback className="bg-brand-primary text-brand-background text-xs">
                  {applicant.nickname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{applicant.nickname}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-brand-text">아직 지원자가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
