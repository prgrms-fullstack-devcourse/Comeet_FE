import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PostItemProps {
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
}

export const PostItem = ({
  title,
  content,
  onTitleChange,
  onContentChange,
}: PostItemProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>제목</Label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="제목을 입력하세요"
          className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary"
          maxLength={100}
        />
        <div className="text-right text-sm text-brand-text">
          {title.length}/100
        </div>
      </div>
      <div className="space-y-3">
        <Label>내용</Label>
        <Textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="내용을 입력하세요"
          className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary resize-none min-h-[200px]"
          maxLength={2000}
        />
        <div className="text-right text-sm text-brand-text">
          {content.length}/2000
        </div>
      </div>
    </div>
  );
};
