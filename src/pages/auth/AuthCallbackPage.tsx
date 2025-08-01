import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GlobalLayout from '@/components/layout/GlobalLayout';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { fetchLogin } from '@/lib/api';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: fetchLogin,
    retry: false,
    onSuccess: (result) => {
      if (result.status === 200) {
        navigate('/', { replace: true });
      } else if (result.status === 210) {
        navigate('/onboarding', { replace: true });
      }
    },
    onError: (error) => {
      console.error('OAuth callback error:', error);
    }
  });

  useEffect(() => {
    const handleCallback = () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const state = searchParams.get('state');

      if (error) {
        navigate('/login', { replace: true });
        console.error('GitHub OAuth 에러:', error);
        return;
      }

      if (!code) {
        navigate('/login', { replace: true });
        console.log('GitHub에서 인증 코드를 받지 못했습니다');
        return;
      }

      const storedState = sessionStorage.getItem('github_oauth_state');
      if (state !== storedState) {
        navigate('/login', { replace: true });
        console.log('보안 검증 실패');
        return;
      }

      signInMutation.mutate(code);
      sessionStorage.removeItem('github_oauth_state');
    }

    handleCallback();
  }, [searchParams, navigate, signInMutation]);

  return (
    <GlobalLayout showHeader={false} showBottomNavigation={false}>
      <div className="flex flex-col items-center justify-center min-h-full">
        {signInMutation.isPending && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-primary mb-6 mx-auto" />
            <h2 className="text-white text-xl mb-2">GitHub 로그인 처리 중...</h2>
            <p className="text-white text-sm">사용자 정보를 확인하고 있습니다</p>
          </div>
        )}

        {signInMutation.isError && (
          <div className="text-center">
            <h2 className="text-white text-2xl mb-4">로그인 실패</h2>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">
                {signInMutation.error?.message || '로그인 처리 중 오류가 발생했습니다'}
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