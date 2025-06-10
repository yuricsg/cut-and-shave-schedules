
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const userType = searchParams.get("type") || "client";
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha email e senha.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log('Starting login process for:', loginData.email);

    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (!error) {
        console.log('Login successful, redirecting...');
        // Wait a bit for the auth state to update
        setTimeout(() => {
          if (userType === "client") {
            navigate("/client-dashboard");
          } else {
            navigate("/barbershop-dashboard");
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
                        required
                        disabled={isLoading}
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
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar como Cliente"}
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
                        required
                        disabled={isLoading}
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
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar como Barbearia"}
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
