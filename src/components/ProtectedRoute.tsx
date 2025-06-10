
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
        console.log('No user found, redirecting to login');
        navigate('/login');
        return;
      }

      // If we have a user but no profile yet, we wait
      if (!userProfile) {
        console.log('User exists but no profile found, waiting...');
        return;
      }

      // If a specific user type is required and the user doesn't match, redirect
      if (requiredUserType && userProfile.user_type !== requiredUserType) {
        console.log('Wrong user type, redirecting. Required:', requiredUserType, 'Actual:', userProfile.user_type);
        
        // Redirect to appropriate dashboard based on user type
        switch (userProfile.user_type) {
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
      } else {
        console.log('Access granted to protected route');
      }
    }
  }, [user, userProfile, loading, navigate, requiredUserType]);

  // Show loading spinner while checking authentication
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

  // If there's no user, render nothing (redirect will happen in useEffect)
  if (!user) {
    return null;
  }

  // If we're still waiting for the user profile, show a loading indicator
  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  // If a specific user type is required and the user doesn't match, render nothing
  // (redirect will happen in useEffect)
  if (requiredUserType && userProfile.user_type !== requiredUserType) {
    return null;
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
