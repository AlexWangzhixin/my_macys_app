import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';

interface ProtectedRouteProps {
  children: JSX.Element;
  requireUser?: 'alex' | 'macy';
}

export default function ProtectedRoute({ children, requireUser }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requireUser && user !== requireUser) return <Navigate to="/login" replace />;
  return children;
}


