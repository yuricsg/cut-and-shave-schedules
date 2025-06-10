
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'client' | 'barbershop' | 'barber';
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedRoute - Loading:', loading, 'User:', !!user, 'Profile:', userProfile?.user_type);
    
    if (!loading) {
      if (!user) {
        console.log('No user, redirecting to login');
        navigate('/login');
        return;
      }

      if (requiredUserType && userProfile?.user_type !== requiredUserType) {
        console.log('Wrong user type, redirecting. Required:', requiredUserType, 'Actual:', userProfile?.user_type);
        // Redirect to appropriate dashboard based on user type
        switch (userProfile?.user_type) {
          case 'client':
            navigate('/client-dashboard');
            break;
          case 'barbershop':
            navigate('/barbershop-dashboard');
            break;
          case 'barber':
            navigate('/barber-dashboard');
            break;
          default:
            navigate('/login');
        }
      }
    }
  }, [user, userProfile, loading, navigate, requiredUserType]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredUserType && userProfile?.user_type !== requiredUserType) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
