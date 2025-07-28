import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface ProfileSectionProps {
  isEditable?: boolean;
}

export const ProfileSection = ({ isEditable = false }: ProfileSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageClick = () => {
    if (!isEditable) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative">
        <div
          className={`w-32 h-32 rounded-full bg-brand-primary flex items-center justify-center overflow-hidden ${
            isEditable ? "cursor-pointer" : ""
          }`}
          onClick={handleImageClick}>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          ) : (
            isEditable && <Camera className="size-12 text-brand-background" />
          )}
        </div>
        {isEditable && (
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        )}
      </div>
      <h2 className="text-2xl font-bold mt-4 text-white">이름</h2>
      <p className="text-brand-text mt-1">나이 · 포지션</p>
      {isEditable && (
        <Button
          variant="outline"
          className="mt-4 bg-transparent border-brand-surface text-white hover:bg-brand-surface/50 hover:text-white">
          프로필 설정
        </Button>
      )}
    </div>
  );
};
