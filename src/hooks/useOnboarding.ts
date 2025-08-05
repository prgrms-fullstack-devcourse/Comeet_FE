import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { OnboardingData } from '@/pages/onboarding/OnboardingPage';

const updateUserProfile = async (data: OnboardingData) => {
  const payload: Partial<OnboardingData> = { ...data };

  if (!payload.email) delete payload.email;
  if (!payload.linkedIn) delete payload.linkedIn;
  if (!payload.instagram) delete payload.instagram;
  if (!payload.blog) delete payload.blog;

  const sessionId = sessionStorage.getItem("sessionId"); 
  if (!sessionId) {
    throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');
  }

  const res = await fetch(`/api/users`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${sessionId}`, 
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message?.[0] || '프로필 업데이트에 실패했습니다.');
  }

  if (res.status !== 204) {
    return res.json();
  }
};

export function useUpdateUserProfile() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success('프로필이 저장되었습니다.');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message || '프로필 저장 중 에러가 발생했습니다.');
    }
  });
}