import { useState } from "react";
import type {
  OnboardingData,
  Coordinates,
} from "@/pages/onboarding/OnboardingPage";
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
import toast from "react-hot-toast";

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

  const [location, setLocation] = useState<Coordinates | null>(
    data.location || null
  );
  const [isLocationLoading, setLocationLoading] = useState(false);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") setAge("");
    else setAge(parseInt(value.replace(/[^0-9]/g, ""), 10));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("사용하시는 기기가 위치 정보 기능을 지원하지 않습니다.");
      return;
    }

    setLocationLoading(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setLocationLoading(false);
        toast.success("위치 정보 수집 완료!");
      },
      (error) => {
        setLocationLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          toast.error("위치 정보 제공을 거부하셨습니다.");
        } else if (error.code === error.TIMEOUT) {
          toast.error("위치 정보를 가져오는 데 시간이 너무 오래 걸립니다.");
        } else {
          toast.error("위치 정보를 가져올 수 없습니다.");
        }
      },
      options
    );
  };

  const handleSubmit = () => {
    if (age === "") return toast.error("나이를 입력해주세요.");
    if (age >= MAX_AGE_LIMIT)
      return toast.error(`나이는 ${MAX_AGE_LIMIT}세 미만으로 입력해주세요.`);
    if (age < 1) return toast.error("나이를 올바르게 입력해주세요.");
    if (!nickname || !experience || !bio)
      return toast.error("모든 항목을 입력해주세요.");
    if (!location) return toast.error("위치 정보를 불러와주세요.");

    const experienceValue = parseInt(experience.replace(/[^0-9]/g, ""), 10);
    onNext({ nickname, age, experience: experienceValue, bio, location });
  };

  return (
    <div className="flex flex-col min-h-[75vh]">
      <div className="flex-grow space-y-6">
        <div className="space-y-3">
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            id="nickname"
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
            value={age}
            onChange={handleAgeChange}
            className={cn(
              "bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary",
              Number(age) >= MAX_AGE_LIMIT &&
                "border-red-500 focus:border-red-500 text-red-500"
            )}
          />
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
                  className="focus:bg-brand-primary"
                >
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
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary h-[120px] resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label>위치 정보</Label>
          <div className="flex items-center gap-x-2">
            <div className="flex-grow p-2 h-10 border rounded-md border-gray-600 bg-gray-800 text-sm flex items-center">
              {isLocationLoading
                ? "위치 정보 불러오는 중..."
                : location
                ? "위치 정보 수집 완료!"
                : "버튼을 눌러 위치 정보를 불러오세요."}
            </div>
            <Button
              onClick={handleGetLocation}
              disabled={isLocationLoading}
              className="bg-lime-400 hover:bg-lime-500 text-black disabled:bg-gray-500 disabled:text-gray-300"
            >
              내 위치 불러오기
            </Button>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold text-lg py-6"
        >
          다음
        </Button>
      </div>
    </div>
  );
}