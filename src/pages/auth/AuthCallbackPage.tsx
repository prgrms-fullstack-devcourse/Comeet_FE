import { useNavigate } from 'react-router-dom';
import GlobalLayout from '@/components/layout/GlobalLayout';
import { Button } from '@/components/ui/button';
import { useGitHubCallback } from '@/hooks/useGitHubCallback';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { isPending, isError, error } = useGitHubCallback();

  return (
    <GlobalLayout showHeader={false} showBottomNavigation={false}>
      <div className="flex flex-col items-center justify-center min-h-full">
        {isPending && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-primary mb-6 mx-auto" />
            <h2 className="text-white text-xl mb-2">GitHub 로그인 처리 중...</h2>
            <p className="text-white text-sm">사용자 정보를 확인하고 있습니다</p>
          </div>
        )}

        {isError && (
          <div className="text-center">
            <h2 className="text-white text-2xl mb-4">로그인 실패</h2>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">
                {error?.message || '로그인 처리 중 오류가 발생했습니다'}
              </p>
            </div>
            <Button
              onClick={() => navigate('/login', { replace: true })}
              className="bg-brand-primary hover:bg-brand-primary/90 text-brand-background"
            >
              다시 로그인 시도
            </Button>
          </div>
        )}
      </div>
    </GlobalLayout>
  );
}