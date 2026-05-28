import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function SecureRoute({ children }: { children: import('react').ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-on-surface">Loading secure vault...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
