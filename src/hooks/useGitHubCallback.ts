import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { fetchLogin } from '@/lib/api';

export const useGitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  const signInMutation = useMutation({
    mutationFn: fetchLogin,
    retry: false,
    onSuccess: (result) => {
      sessionStorage.removeItem('github_oauth_state');

      if (result.status === 200) {
        localStorage.setItem('access_token', result.token);
        navigate('/', { replace: true });
      } else if (result.status === 210) {
        sessionStorage.setItem('github_id', result.githubId);
        navigate('/onboarding', { replace: true });
      }
    },
    onError: (error) => {
      console.error('OAuth callback error:', error);
    }
  });

  useEffect(() => {
    if (hasProcessed.current) return;

    const handleCallback = () => {
      hasProcessed.current = true;

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
    };

    handleCallback();
  }, [searchParams, navigate]);

  return {
    isPending: signInMutation.isPending,
    isError: signInMutation.isError,
    error: signInMutation.error,
  };
};