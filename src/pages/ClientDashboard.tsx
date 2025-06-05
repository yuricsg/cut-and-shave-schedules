
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, 
  Scissors, 
  Clock, 
  DollarSign, 
  User,
  CalendarDays,
  History
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState("");
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const services = [
    { id: "1", name: "Corte de Cabelo", price: 25, duration: 30 },
    { id: "2", name: "Barba", price: 15, duration: 20 },
    { id: "3", name: "Corte + Barba", price: 35, duration: 45 },
    { id: "4", name: "Sobrancelha", price: 10, duration: 15 }
  ];

  const barbers = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Pedro Santos" },
    { id: "3", name: "Carlos Lima" }
  ];

  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const appointments = [
    {
      id: "1",
      service: "Corte + Barba",
      barber: "João Silva",
      date: "2024-06-10",
      time: "14:00",
      status: "confirmado"
    },
    {
      id: "2",
      service: "Corte de Cabelo",
      barber: "Pedro Santos",
      date: "2024-05-28",
      time: "10:30",
      status: "concluído"
    }
  ];

  const handleBooking = () => {
    if (selectedDate && selectedService && selectedTime) {
      toast({
        title: "Agendamento confirmado!",
        description: `Seu agendamento foi marcado para ${selectedDate.toLocaleDateString()} às ${selectedTime}.`,
      });
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedService("");
      setSelectedBarber("");
      setSelectedTime("");
    } else {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Scissors className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">BarberBook</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Olá, Cliente!</span>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {showHistory ? "Meus Agendamentos" : "Novo Agendamento"}
          </h2>
          <Button
            onClick={() => setShowHistory(!showHistory)}
            variant="outline"
          >
            {showHistory ? (
              <>
                <CalendarDays className="w-4 h-4 mr-2" />
                Novo Agendamento
              </>
            ) : (
              <>
                <History className="w-4 h-4 mr-2" />
                Meus Agendamentos
              </>
            )}
          </Button>
        </div>

        {!showHistory ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scissors className="w-5 h-5 mr-2" />
                  Serviços Disponíveis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedService === service.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          {service.duration} min
                        </div>
                      </div>
                      <div className="flex items-center text-green-600 font-medium">
                        <DollarSign className="w-4 h-4" />
                        {service.price}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Barber Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Escolher Barbeiro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedBarber} onValueChange={setSelectedBarber}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um barbeiro (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {barbers.map((barber) => (
                      <SelectItem key={barber.id} value={barber.id}>
                        {barber.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Calendar and Time */}
            <Card>
              <CardHeader>
                <CardTitle>Data e Horário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
                
                {selectedDate && (
                  <div>
                    <h4 className="font-medium mb-2">Horários Disponíveis</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking Summary */}
            {(selectedService || selectedDate || selectedTime) && (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Resumo do Agendamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      {selectedService && (
                        <p><strong>Serviço:</strong> {services.find(s => s.id === selectedService)?.name}</p>
                      )}
                      {selectedBarber && (
                        <p><strong>Barbeiro:</strong> {barbers.find(b => b.id === selectedBarber)?.name}</p>
                      )}
                      {selectedDate && (
                        <p><strong>Data:</strong> {selectedDate.toLocaleDateString()}</p>
                      )}
                      {selectedTime && (
                        <p><strong>Horário:</strong> {selectedTime}</p>
                      )}
                    </div>
                    <Button onClick={handleBooking} size="lg">
                      Confirmar Agendamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Appointments History */
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="flex justify-between items-center p-6">
                  <div className="space-y-1">
                    <h3 className="font-medium">{appointment.service}</h3>
                    <p className="text-sm text-gray-600">Barbeiro: {appointment.barber}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(appointment.date).toLocaleDateString()} às {appointment.time}
                    </p>
                  </div>
                  <Badge 
                    variant={appointment.status === "confirmado" ? "default" : "secondary"}
                  >
                    {appointment.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
