import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // TODO: 현재 백엔드에서 로그인 응답을 sessionId로 제공하고 있어 
  // 임시로 session_id로 인증 체크 중. 추후 access_token으로 통일 예정
  const token = localStorage.getItem('session_id');
  
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};