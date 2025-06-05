
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const userType = searchParams.get("type") || "client";
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de login
    if (loginData.email && loginData.password) {
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a) ao sistema!`,
      });
      
      if (userType === "client") {
        navigate("/client-dashboard");
      } else {
        navigate("/barbershop-dashboard");
      }
    } else {
      toast({
        title: "Erro no login",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
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
            <CardTitle className="text-2xl">Fazer Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="client"
                  onClick={() => navigate("/login?type=client")}
                >
                  Cliente
                </TabsTrigger>
                <TabsTrigger 
                  value="barbershop"
                  onClick={() => navigate("/login?type=barbershop")}
                >
                  Barbearia
                </TabsTrigger>
              </TabsList>

              <TabsContent value="client" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Sua senha"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Entrar como Cliente
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="barbershop" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="barbershop-email">E-mail da Barbearia</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="barbershop-email"
                        type="email"
                        placeholder="barbearia@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
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
                        placeholder="Sua senha"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Entrar como Barbearia
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Button
                onClick={() => navigate("/register")}
                variant="link"
              >
                Não tem conta? Cadastre-se
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
