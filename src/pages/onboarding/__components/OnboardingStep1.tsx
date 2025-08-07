import { useState, useEffect } from "react";
import type { OnboardingData } from "@/pages/onboarding/index.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const MAX_AGE_LIMIT = 120;

interface StepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: Partial<OnboardingData>;
}

export function OnboardingStep1({ onNext, data }: StepProps) {
  const [nickname, setNickname] = useState(data.nickname || "");
  const [age, setAge] = useState<number | "">(data.age || "");
  const [experience, setExperience] = useState(
    data.experience ? `${data.experience}년차` : ""
  );
  const [bio, setBio] = useState(data.bio || "");
  const [isValid, setIsValid] = useState(false);

  // 유효성 검사
  useEffect(() => {
    const isValidForm =
      nickname.trim() !== "" &&
      age !== "" &&
      Number(age) > 0 &&
      Number(age) < MAX_AGE_LIMIT &&
      experience !== "" &&
      bio.trim() !== "";

    setIsValid(isValidForm);
  }, [nickname, age, experience, bio]);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setAge("");
    } else {
      const numValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
      setAge(numValue);
    }
  };

  const handleSubmit = () => {
    if (!isValid) {
      alert("모든 항목을 올바르게 입력해주세요.");
      return;
    }

    const experienceValue = parseInt(experience, 10);
    onNext({
      nickname: nickname.trim(),
      age: Number(age),
      experience: experienceValue,
      bio: bio.trim(),
    });
  };

  return (
    <div className="flex flex-col min-h-[70vh]">
      <div className="flex-grow space-y-6">
        <div className="space-y-3">
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            id="nickname"
            placeholder="사용하실 닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="age">나이</Label>
          <Input
            id="age"
            type="number"
            min="1"
            placeholder="나이를 입력하세요"
            value={age}
            onChange={handleAgeChange}
            className={cn(
              "bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary",
              Number(age) >= MAX_AGE_LIMIT &&
                "border-red-500 focus:border-red-500 text-red-500"
            )}
          />
          {Number(age) >= MAX_AGE_LIMIT && (
            <p className="text-red-500 text-sm">
              나이는 {MAX_AGE_LIMIT} 미만으로 입력해주세요.
            </p>
          )}
        </div>
        <div className="space-y-3">
          <Label htmlFor="experience">경력</Label>
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger className="w-full bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary">
              <SelectValue placeholder="경력을 선택하세요" />
            </SelectTrigger>
            <SelectContent className="bg-brand-surface border-transparent text-white">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((year) => (
                <SelectItem
                  key={year}
                  value={`${year}년차`}
                  className="focus:bg-brand-primary">
                  {year}년차
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <Label htmlFor="bio">소개</Label>
          <Textarea
            id="bio"
            placeholder="자신을 자유롭게 소개해주세요."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary h-[120px] resize-none"
          />
        </div>
      </div>
      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className={cn(
            "w-full font-bold text-lg py-6",
            isValid
              ? "bg-brand-primary hover:bg-brand-primary/90 text-black"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          )}>
          다음
        </Button>
      </div>
    </div>
  );
}
