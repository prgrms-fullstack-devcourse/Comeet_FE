import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAddPostModal } from "../../../../hooks/useAddPostModal";

export const PostItem = () => {
  const { title, content, setTitle, setContent } = useAddPostModal();

  return (
    <div className="space-y-6">
      {/* 제목 입력 */}
      <div className="space-y-3">
        <Label>제목</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="bg-brand-surface border-transparent focus:!ring-0 focus:!border-brand-primary"
          maxLength={100}
        />
        <div className="text-right text-sm text-brand-text">
          {title.length}/100
        </div>
      </div>

      {/* 내용 입력 */}
      <div className="space-y-3">
        <Label>내용</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
