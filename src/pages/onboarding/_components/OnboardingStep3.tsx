import { useState } from "react";
import type { OnboardingData } from "@/pages/onboarding/index.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Linkedin, Mail, Instagram, Rss } from "lucide-react";

interface StepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: Partial<OnboardingData>;
}

export function OnboardingStep3({ onNext, data }: StepProps) {
  const [linkedin, setLinkedin] = useState(data.linkedin || "");
  const [email, setEmail] = useState(data.email || "");
  const [instagram, setInstagram] = useState(data.instagram || "");
  const [blog, setBlog] = useState(data.blog || "");

  const handleSubmit = () => {
    onNext({
      linkedin: linkedin.trim(),
      email: email.trim(),
      instagram: instagram.trim(),
      blog: blog.trim(),
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-brand-text">
        다른 사람들에게 자신을 보여줄 수 있는 링크를 추가해보세요. (선택사항)
      </p>

      <div className="space-y-3">
        <Label htmlFor="linkedin">링크드인</Label>
        <div className="relative">
          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text" />
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/..."
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
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
            placeholder="contact@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary pl-10"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="instagram">인스타그램</Label>
        <div className="relative">
          <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text" />
          <Input
            id="instagram"
            placeholder="https://instagram.com/..."
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
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
            placeholder="https://example.com"
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary pl-10"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          className="w-full bg-brand-primary hover:bg-brand-primary/80 text-black font-bold text-lg py-6">
          완료
        </Button>
      </div>
    </div>
  );
}
