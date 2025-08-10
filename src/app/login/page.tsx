"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (provider: string) => {
    setIsLoading(true)
    
    // Redirecionar para o Flowise baseado no README
    if (provider === "supabase") {
      window.location.href = "http://localhost:3001/signin"
    } else if (provider === "google") {
      window.location.href = "http://localhost:3001/api/v1/auth/google"
    } else if (provider === "github") {
      window.location.href = "http://localhost:3001/api/v1/auth/github"
    }
    
    // Simulação de loading
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">UD</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            urbanDev
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Plataforma de IA para Pequenos e Médios Negócios
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Entrar na sua conta</CardTitle>
            <CardDescription>
              Escolha como você gostaria de acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="supabase" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="supabase">Email</TabsTrigger>
                <TabsTrigger value="google">Google</TabsTrigger>
                <TabsTrigger value="github">GitHub</TabsTrigger>
              </TabsList>
              
              <TabsContent value="supabase" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <Button 
                  onClick={() => handleLogin("supabase")} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Redirecionando..." : "Entrar com Email"}
                </Button>
              </TabsContent>
              
              <TabsContent value="google" className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Você será redirecionado para fazer login com sua conta Google
                  </p>
                  <Button 
                    onClick={() => handleLogin("google")} 
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Redirecionando..." : "Entrar com Google"}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="github" className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Você será redirecionado para fazer login com sua conta GitHub
                  </p>
                  <Button 
                    onClick={() => handleLogin("github")} 
                    className="w-full bg-gray-800 hover:bg-gray-900"
                    disabled={isLoading}
                  >
                    {isLoading ? "Redirecionando..." : "Entrar com GitHub"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Links adicionais */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <button 
              onClick={() => window.location.href = "http://localhost:3001/register"}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Cadastre-se
            </button>
          </p>
          <p className="text-xs text-gray-500">
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
