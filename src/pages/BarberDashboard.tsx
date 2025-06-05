
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, 
  Scissors, 
  CheckCircle,
  Clock,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BarberDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      client: "João Silva",
      service: "Corte + Barba",
      time: "09:00",
      status: "confirmado"
    },
    {
      id: "2",
      client: "Maria Costa",
      service: "Corte de Cabelo",
      time: "10:30",
      status: "em_andamento"
    },
    {
      id: "3",
      client: "Roberto Oliveira",
      service: "Barba",
      time: "14:00",
      status: "confirmado"
    },
    {
      id: "4",
      client: "Ana Souza",
      service: "Corte de Cabelo",
      time: "15:30",
      status: "confirmado"
    }
  ]);

  const handleCompleteService = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: "concluido" }
        : apt
    ));
    
    toast({
      title: "Atendimento concluído!",
      description: "O atendimento foi marcado como concluído.",
    });
  };

  const handleStartService = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: "em_andamento" }
        : apt
    ));
    
    toast({
      title: "Atendimento iniciado!",
      description: "O atendimento foi marcado como em andamento.",
    });
  };

  const handleLogout = () => {
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado": return "default";
      case "em_andamento": return "secondary";
      case "concluido": return "outline";
      default: return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmado": return "Confirmado";
      case "em_andamento": return "Em Andamento";
      case "concluido": return "Concluído";
      default: return status;
    }
  };

  const todayStats = {
    total: appointments.length,
    completed: appointments.filter(apt => apt.status === "concluido").length,
    inProgress: appointments.filter(apt => apt.status === "em_andamento").length,
    pending: appointments.filter(apt => apt.status === "confirmado").length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Scissors className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">BarberBook - Barbeiro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">João Silva</span>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">{todayStats.total}</div>
              <div className="text-sm text-gray-600">Total do Dia</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{todayStats.completed}</div>
              <div className="text-sm text-gray-600">Concluídos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{todayStats.inProgress}</div>
              <div className="text-sm text-gray-600">Em Andamento</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">{todayStats.pending}</div>
              <div className="text-sm text-gray-600">Pendentes</div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Agenda de Hoje</h2>
            <div className="text-sm text-gray-600">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="grid gap-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-mono font-medium text-blue-600 min-w-[60px]">
                        {appointment.time}
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <h3 className="font-medium">{appointment.client}</h3>
                          <p className="text-sm text-gray-600">{appointment.service}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge variant={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                      
                      {appointment.status === "confirmado" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStartService(appointment.id)}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Iniciar
                        </Button>
                      )}
                      
                      {appointment.status === "em_andamento" && (
                        <Button 
                          size="sm"
                          onClick={() => handleCompleteService(appointment.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Concluir
                        </Button>
                      )}
                      
                      {appointment.status === "concluido" && (
                        <div className="text-green-600 text-sm font-medium">
                          ✓ Concluído
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {appointments.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Scissors className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum agendamento para hoje
                </h3>
                <p className="text-gray-600">
                  Você não tem agendamentos para hoje. Aproveite para descansar!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarberDashboard;
