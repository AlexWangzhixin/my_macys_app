import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';

interface ProtectedRouteProps {
  children: JSX.Element;
  // 保留但不强制使用角色限制，满足“登录后在两个中心自由切换”的需求
  requireUser?: 'alex' | 'macy';
}

export default function ProtectedRoute({ children, requireUser }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requireUser && user !== requireUser) {
    const fallback = user === 'alex' ? '/alex' : '/';
    return <Navigate to={fallback} replace />;
  }
  return children;
}


