
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, 
  Scissors, 
  Calendar,
  Users,
  Settings,
  DollarSign,
  Clock,
  Plus
} from "lucide-react";

const BarbershopDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("agenda");

  const todayAppointments = [
    {
      id: "1",
      client: "João Silva",
      service: "Corte + Barba",
      barber: "Pedro Santos",
      time: "09:00",
      status: "confirmado"
    },
    {
      id: "2",
      client: "Maria Costa",
      service: "Corte de Cabelo",
      barber: "Carlos Lima",
      time: "10:30",
      status: "em_andamento"
    },
    {
      id: "3",
      client: "Roberto Oliveira",
      service: "Barba",
      barber: "João Silva",
      time: "14:00",
      status: "confirmado"
    }
  ];

  const services = [
    { id: "1", name: "Corte de Cabelo", price: 25, duration: 30 },
    { id: "2", name: "Barba", price: 15, duration: 20 },
    { id: "3", name: "Corte + Barba", price: 35, duration: 45 },
    { id: "4", name: "Sobrancelha", price: 10, duration: 15 }
  ];

  const barbers = [
    { 
      id: "1", 
      name: "João Silva", 
      schedule: "Seg-Sex: 8h-18h",
      services: ["Corte de Cabelo", "Barba", "Corte + Barba"]
    },
    { 
      id: "2", 
      name: "Pedro Santos", 
      schedule: "Seg-Sáb: 9h-19h",
      services: ["Corte de Cabelo", "Corte + Barba"]
    },
    { 
      id: "3", 
      name: "Carlos Lima", 
      schedule: "Ter-Sáb: 8h-17h",
      services: ["Corte de Cabelo", "Barba", "Sobrancelha"]
    }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Scissors className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">BarberBook - Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Barbearia do João</span>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg border">
          <Button
            variant={activeView === "agenda" ? "default" : "ghost"}
            onClick={() => setActiveView("agenda")}
            className="flex-1"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Agenda
          </Button>
          <Button
            variant={activeView === "services" ? "default" : "ghost"}
            onClick={() => setActiveView("services")}
            className="flex-1"
          >
            <Scissors className="w-4 h-4 mr-2" />
            Serviços
          </Button>
          <Button
            variant={activeView === "barbers" ? "default" : "ghost"}
            onClick={() => setActiveView("barbers")}
            className="flex-1"
          >
            <Users className="w-4 h-4 mr-2" />
            Barbeiros
          </Button>
          <Button
            variant={activeView === "appointments" ? "default" : "ghost"}
            onClick={() => setActiveView("appointments")}
            className="flex-1"
          >
            <Settings className="w-4 h-4 mr-2" />
            Agendamentos
          </Button>
        </div>

        {/* Agenda View */}
        {activeView === "agenda" && (
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
              {todayAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="flex justify-between items-center p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-mono font-medium text-blue-600">
                        {appointment.time}
                      </div>
                      <div>
                        <h3 className="font-medium">{appointment.client}</h3>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                        <p className="text-sm text-gray-500">Barbeiro: {appointment.barber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Gerenciar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Services View */}
        {activeView === "services" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gerenciar Serviços</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Serviço
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">{service.name}</h3>
                      <Button size="sm" variant="ghost">
                        Editar
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        R$ {service.price}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration} minutos
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Barbers View */}
        {activeView === "barbers" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gerenciar Barbeiros</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Barbeiro
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {barbers.map((barber) => (
                <Card key={barber.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">{barber.name}</h3>
                      <Button size="sm" variant="ghost">
                        Editar
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Horário:</strong> {barber.schedule}</p>
                      <div>
                        <strong>Serviços:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {barber.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Management View */}
        {activeView === "appointments" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gerenciar Agendamentos</h2>
              <div className="flex space-x-2">
                <Button variant="outline">Por Barbeiro</Button>
                <Button variant="outline">Por Data</Button>
              </div>
            </div>

            <div className="grid gap-4">
              {todayAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="flex justify-between items-center p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-mono font-medium text-blue-600">
                        {appointment.time}
                      </div>
                      <div>
                        <h3 className="font-medium">{appointment.client}</h3>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                        <p className="text-sm text-gray-500">Barbeiro: {appointment.barber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Reagendar
                      </Button>
                      <Button size="sm" variant="destructive">
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarbershopDashboard;
