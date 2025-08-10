import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Linkedin,
  Mail,
  Instagram,
  Rss,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PositionSelector } from "@/components/common/PositionSelector";
import { StackSelector } from "@/components/common/StackSelector";
import Header from "@/components/layout/Header";
import { useMyProfile, useUpdateProfile } from "@/hooks/queries/useMy";
import { usePositionsInterests } from "@/hooks/queries/useTags";
import { cn } from "@/lib/utils";
import type { UpdateProfileRequest } from "@/types/my.types";

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useMyProfile();
  const { data: positionsInterestsData } = usePositionsInterests();
  const updateProfileMutation = useUpdateProfile();

  const [formData, setFormData] = useState<UpdateProfileRequest>({
    nickname: "",
    experience: 0,
    bio: "",
    positionId: undefined,
    techIds: [],
    interestIds: [],
    github: "",
    email: "",
    instagram: "",
    linkedIn: "",
    blog: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        nickname: profile.nickname || "",
        experience: profile.experience || 0,
        bio: profile.bio || "",
        positionId: profile.position?.id || undefined,
        techIds: profile.techStack?.map((tech: any) => tech.id) || [],
        interestIds:
          profile.interests?.map((interest: any) => interest.id) || [],
        github: profile.github || "",
        email: profile.email || "",
        instagram: profile.instagram || "",
        linkedIn: profile.linkedIn || "",
        blog: profile.blog || "",
      });
    }
  }, [profile]);

  const handleInputChange = (field: keyof UpdateProfileRequest, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        nickname: formData.nickname,
        experience: formData.experience,
        bio: formData.bio,
        positionId: formData.positionId,
        techIds: formData.techIds,
        interestIds: formData.interestIds,
        ...(formData.github && { github: formData.github }),
        ...(formData.email && { email: formData.email }),
        ...(formData.instagram && { instagram: formData.instagram }),
        ...(formData.linkedIn && { linkedIn: formData.linkedIn }),
        ...(formData.blog && { blog: formData.blog }),
      };

      await updateProfileMutation.mutateAsync(requestData);
      navigate("/my");
    } catch (error) {
      alert("프로필 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleBack = () => {
    navigate("/my");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-background text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p>프로필을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-background text-white">
      <Header
        title="프로필 수정"
        leftIcon={<ArrowLeft />}
        onLeftClick={handleBack}
      />

      <div className="p-4 space-y-6 pt-16">
        {/* 기본 정보 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">기본 정보</h3>

          <div className="space-y-3">
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              value={formData.nickname}
              onChange={(e) => handleInputChange("nickname", e.target.value)}
              className="bg-brand-surface border-brand-surface text-white"
              placeholder="닉네임을 입력하세요"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="experience">경력 (년)</Label>
            <Input
              id="experience"
              type="number"
              value={formData.experience || ""}
              onChange={(e) =>
                handleInputChange("experience", parseInt(e.target.value) || 0)
              }
              className="bg-brand-surface border-brand-surface text-white"
              placeholder="경력을 입력하세요"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="bio">자기소개</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="bg-brand-surface border-brand-surface text-white min-h-[100px]"
              placeholder="자기소개를 입력하세요"
            />
          </div>
        </div>

        {/* 포지션 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">포지션</h3>
          <PositionSelector
            selectedPosition={formData.positionId || null}
            onPositionChange={(positionId) =>
              handleInputChange("positionId", positionId)
            }
          />
        </div>

        {/* 기술 스택 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">기술 스택</h3>
          <StackSelector
            selectedStackIds={formData.techIds || []}
            onStackChange={(techIds) => handleInputChange("techIds", techIds)}
            maxSelection={10}
          />
        </div>

        {/* 관심사 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">관심사</h3>
          <div className="space-y-3">
            <Label>관심 분야 (최대 3개)</Label>
            <div className="grid grid-cols-4 gap-2">
              {positionsInterestsData?.interests?.map((interest) => (
                <Button
                  key={interest.id}
                  variant="outline"
                  onClick={() => {
                    const currentIds = formData.interestIds || [];
                    const newIds = currentIds.includes(interest.id)
                      ? currentIds.filter((id) => id !== interest.id)
                      : currentIds.length < 3
                      ? [...currentIds, interest.id]
                      : currentIds;
                    handleInputChange("interestIds", newIds);
                  }}
                  className={cn(
                    "rounded-md border-brand-surface bg-transparent hover:bg-brand-primary hover:text-white",
                    (formData.interestIds || []).includes(interest.id) &&
                      "border-brand-primary text-brand-primary border-1"
                  )}>
                  <span className="text-sm">{interest.value}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* 소셜 링크 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">소셜 링크</h3>
          <p className="text-sm text-brand-text">
            다른 사람들에게 자신을 보여줄 수 있는 링크를 추가해보세요.
            (선택사항)
          </p>

          <div className="space-y-3">
            <Label htmlFor="github">GitHub</Label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text" />
              <Input
                id="github"
                value={formData.github || ""}
                onChange={(e) => handleInputChange("github", e.target.value)}
                placeholder="https://github.com/..."
                className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text" />
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="contact@example.com"
                className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="instagram">Instagram</Label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text" />
              <Input
                id="instagram"
                value={formData.instagram || ""}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                placeholder="https://instagram.com/..."
                className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text" />
              <Input
                id="linkedin"
                value={formData.linkedIn || ""}
                onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="blog">블로그</Label>
            <div className="relative">
              <Rss className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text" />
              <Input
                id="blog"
                value={formData.blog || ""}
                onChange={(e) => handleInputChange("blog", e.target.value)}
                placeholder="https://example.com"
                className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary pl-10"
              />
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="pt-6">
          <Button
            onClick={handleSubmit}
            disabled={updateProfileMutation.isPending}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-black">
            {updateProfileMutation.isPending ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>
    </div>
  );
};
