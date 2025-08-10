"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  Bot, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut,
  Zap,
  Shield,
  Database,
  Globe
} from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Dados mockados para o dashboard
  const stats = [
    {
      title: "Agentes Ativos",
      value: "12",
      change: "+23%",
      icon: Bot,
      color: "text-blue-600"
    },
    {
      title: "Usuários",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Interações/Mês",
      value: "2.5M",
      change: "+45%",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Satisfação",
      value: "98%",
      change: "+2%",
      icon: Shield,
      color: "text-orange-600"
    }
  ]

  const agents = [
    {
      name: "Agente de Atendimento",
      status: "ativo",
      interactions: 15420,
      satisfaction: 98,
      description: "Atendimento 24/7 com compreensão contextual"
    },
    {
      name: "Agente de Análise",
      status: "ativo",
      interactions: 8750,
      satisfaction: 96,
      description: "Análise preditiva e insights em tempo real"
    },
    {
      name: "Agente de Automação",
      status: "ativo",
      interactions: 12300,
      satisfaction: 99,
      description: "Automação de processos e fluxos inteligentes"
    }
  ]

  const recentActivity = [
    {
      action: "Novo usuário cadastrado",
      user: "João Silva",
      time: "2 minutos atrás",
      type: "user"
    },
    {
      action: "Agente atualizado",
      user: "Maria Santos",
      time: "15 minutos atrás",
      type: "agent"
    },
    {
      action: "Workspace criado",
      user: "Pedro Oliveira",
      time: "1 hora atrás",
      type: "workspace"
    },
    {
      action: "Login via Google",
      user: "Ana Costa",
      time: "2 horas atrás",
      type: "auth"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">UD</span>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">urbanDev</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = "http://localhost:3001"}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="mt-2 text-gray-600">
            Bem-vindo ao seu painel de controle da plataforma urbanDev
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} desde o último mês
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="agents">Agentes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agentes Ativos */}
              <Card>
                <CardHeader>
                  <CardTitle>Agentes de IA Ativos</CardTitle>
                  <CardDescription>
                    Seus agentes inteligentes em operação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agents.map((agent, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bot className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{agent.name}</p>
                            <p className="text-sm text-gray-600">{agent.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1">
                            {agent.interactions.toLocaleString()} interações
                          </Badge>
                          <p className="text-sm text-gray-600">{agent.satisfaction}% satisfação</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance do Sistema</CardTitle>
                  <CardDescription>
                    Métricas de desempenho em tempo real
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Tempo de Resposta</span>
                        <span className="text-green-600">98ms</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Uso de CPU</span>
                        <span className="text-blue-600">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Memória</span>
                        <span className="text-orange-600">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Disponibilidade</span>
                        <span className="text-green-600">99.9%</span>
                      </div>
                      <Progress value={99.9} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Agentes</CardTitle>
                <CardDescription>
                  Configure e gerencie seus agentes de IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Bot className="h-6 w-6 text-blue-600" />
                          <div>
                            <h3 className="font-semibold">{agent.name}</h3>
                            <Badge variant={agent.status === "ativo" ? "default" : "secondary"}>
                              {agent.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-1" />
                            Configurar
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Estatísticas
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{agent.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Interações:</span>
                          <span className="ml-2 font-medium">{agent.interactions.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Satisfação:</span>
                          <span className="ml-2 font-medium">{agent.satisfaction}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <span className="ml-2 font-medium text-green-600">Operacional</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Bot className="h-4 w-4 mr-2" />
                    Criar Novo Agente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crescimento de Usuários</CardTitle>
                  <CardDescription>
                    Novos usuários nos últimos 30 dias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Gráfico de crescimento</p>
                      <p className="text-sm">Integração com Recharts disponível</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Interações por Agente</CardTitle>
                  <CardDescription>
                    Distribuição de interações entre agentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Database className="h-12 w-12 mx-auto mb-2" />
                      <p>Gráfico de distribuição</p>
                      <p className="text-sm">Dados em tempo real</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>
                  Últimas atividades no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {activity.type === "user" && <Users className="h-5 w-5 text-blue-600" />}
                        {activity.type === "agent" && <Bot className="h-5 w-5 text-green-600" />}
                        {activity.type === "workspace" && <Globe className="h-5 w-5 text-purple-600" />}
                        {activity.type === "auth" && <Shield className="h-5 w-5 text-orange-600" />}
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-600">por {activity.user}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
