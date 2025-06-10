
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, Lock, Building2, MapPin } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [activeTab, setActiveTab] = useState("client");
  
  const [clientData, setClientData] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });

  const [barbershopData, setBarbershopData] = useState({
    name: "",
    address: "",
    email: "",
    password: ""
  });

  const handleClientRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!Object.values(clientData).every(value => value)) {
      return;
    }

    const { error } = await signUp(clientData.email, clientData.password, {
      user_type: 'client',
      name: clientData.name,
      phone: clientData.phone
    });

    if (!error) {
      navigate("/login?type=client");
    }
  };

  const handleBarbershopRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!Object.values(barbershopData).every(value => value)) {
      return;
    }

    const { error } = await signUp(barbershopData.email, barbershopData.password, {
      user_type: 'barbershop',
      name: barbershopData.name,
      address: barbershopData.address
    });

    if (!error) {
      navigate("/login?type=barbershop");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Criar Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">Cliente</TabsTrigger>
                <TabsTrigger value="barbershop">Barbearia</TabsTrigger>
              </TabsList>

              <TabsContent value="client" className="mt-6">
                <form onSubmit={handleClientRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="client-name">Nome Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="client-name"
                        type="text"
                        placeholder="Digite seu nome:"
                        className="pl-10"
                        value={clientData.name}
                        onChange={(e) => setClientData({...clientData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="client-phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="client-phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        className="pl-10"
                        value={clientData.phone}
                        onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="client-email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="client-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10"
                        value={clientData.email}
                        onChange={(e) => setClientData({...clientData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="client-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="client-password"
                        type="password"
                        placeholder="Crie uma senha"
                        className="pl-10"
                        value={clientData.password}
                        onChange={(e) => setClientData({...clientData, password: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Cadastrar Cliente
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="barbershop" className="mt-6">
                <form onSubmit={handleBarbershopRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="barbershop-name">Nome da Barbearia</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="barbershop-name"
                        type="text"
                        placeholder="Nome da Barbearia"
                        className="pl-10"
                        value={barbershopData.name}
                        onChange={(e) => setBarbershopData({...barbershopData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="barbershop-address">Endereço</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="barbershop-address"
                        placeholder="Av. República do Líbano, 251 - Pina, Recife - PE, 51110-160"
                        className="pl-10 min-h-[60px]"
                        value={barbershopData.address}
                        onChange={(e) => setBarbershopData({...barbershopData, address: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="barbershop-email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="barbershop-email"
                        type="email"
                        placeholder="sua@barbearia.com"
                        className="pl-10"
                        value={barbershopData.email}
                        onChange={(e) => setBarbershopData({...barbershopData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="barbershop-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="barbershop-password"
                        type="password"
                        placeholder="Crie uma senha"
                        className="pl-10"
                        value={barbershopData.password}
                        onChange={(e) => setBarbershopData({...barbershopData, password: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Cadastrar Barbearia
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Button
                onClick={() => navigate("/login")}
                variant="link"
              >
                Já tem conta? Faça login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
