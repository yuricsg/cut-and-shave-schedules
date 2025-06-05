
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Scissors, Users, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, userProfile, loading } = useAuth();

  useEffect(() => {
    // Redirect authenticated users to their respective dashboards
    if (!loading && user && userProfile) {
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
      }
    }
  }, [user, userProfile, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Don't show welcome page if user is authenticated
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BarberBook</h1>
          <p className="text-gray-600">Sistema de agendamento para barbearias</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => navigate("/login?type=client")}
            className="w-full h-12 text-lg"
            variant="default"
          >
            <Users className="w-5 h-5 mr-2" />
            Entrar como Cliente
          </Button>

          <Button
            onClick={() => navigate("/login?type=barbershop")}
            className="w-full h-12 text-lg"
            variant="outline"
          >
            <Building2 className="w-5 h-5 mr-2" />
            Entrar como Barbearia
          </Button>

          <div className="pt-4 border-t">
            <Button
              onClick={() => navigate("/register")}
              variant="ghost"
              className="w-full"
            >
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
