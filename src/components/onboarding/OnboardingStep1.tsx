import { useState } from 'react';
import type { OnboardingData } from '@/pages/onboarding/OnboardingPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface StepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: Partial<OnboardingData>;
}

export function OnboardingStep1({ onNext, data }: StepProps) {
  const [nickname, setNickname] = useState(data.nickname || '');
  const [age, setAge] = useState(data.age || '');
  const [experience, setExperience] = useState(data.experience ? `${data.experience}년차` : '');
  const [bio, setBio] = useState(data.bio || '');

  const handleSubmit = () => {
    if (Number(age) >= 120) {
      alert('나이는 120 미만으로 입력해주세요.');
      return;
    }
    if (!nickname || !age || !experience || !bio) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    
    const experienceValue = parseInt(experience, 10);

    onNext({ nickname, age: Number(age), experience: experienceValue, bio });
  };

  return (
    <div className="flex flex-col min-h-[75vh]">
      <div className="flex-grow space-y-6">
        <div className="space-y-2">
          <Label htmlFor="nickname">닉네임</Label>
          <Input id="nickname" placeholder="사용하실 닉네임을 입력하세요" value={nickname} onChange={(e) => setNickname(e.target.value)} className="bg-gray-800 border-gray-600 focus:border-lime-400"/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">나이</Label>
          <Input id="age" type="number" placeholder="나이를 입력하세요" value={age} onChange={(e) => setAge(e.target.value)} className={cn("bg-gray-800 border-gray-600 focus:border-lime-400", Number(age) >= 120 && "border-red-500 focus:border-red-500 text-red-500")}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">경력</Label>
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger className="w-full bg-gray-800 border-gray-600 focus:ring-lime-400">
              <SelectValue placeholder="경력을 선택하세요" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              {Array.from({ length: 20 }, (_, i) => i + 1).map(year => (<SelectItem key={year} value={`${year}년차`} className="focus:bg-gray-700">{year}년차</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">소개</Label>
          <Textarea id="bio" placeholder="자신을 자유롭게 소개해주세요." value={bio} onChange={(e) => setBio(e.target.value)} className="bg-gray-800 border-gray-600 focus:border-lime-400 min-h-[120px]"/>
        </div>
      </div>
      <div className="pt-4">
        <Button onClick={handleSubmit} className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold text-lg py-6">다음</Button>
      </div>
    </div>
  );
}