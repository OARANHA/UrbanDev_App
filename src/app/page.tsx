"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Bot, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  BarChart3,
  Globe,
  Clock,
  CheckCircle
} from "lucide-react"

export default function Home() {
  const stats = [
    { icon: Users, value: "500+", label: "Empresas Atendidas" },
    { icon: TrendingUp, value: "87%", label: "Aumento de Produtividade" },
    { icon: Clock, value: "24/7", label: "Suporte Automatizado" },
    { icon: CheckCircle, value: "98%", label: "Satisfação" }
  ]

  const features = [
    {
      icon: Bot,
      title: "Agentes de IA Inteligentes",
      description: "Crie e gerencie agentes especializados para diversas tarefas com compreensão contextual e aprendizado contínuo."
    },
    {
      icon: Zap,
      title: "Workflows Poderosos",
      description: "Construa fluxos de trabalho conectando múltiplos agentes e ferramentas para automação avançada."
    },
    {
      icon: Shield,
      title: "Segurança Empresarial",
      description: "Proteção de dados avançada com criptografia de ponta a ponta e conformidade com LGPD."
    },
    {
      icon: BarChart3,
      title: "Analytics em Tempo Real",
      description: "Acompanhe métricas e desempenho em tempo real com dashboards interativos e relatórios detalhados."
    },
    {
      icon: Globe,
      title: "Integração Rápida",
      description: "Conecte-se facilmente com ferramentas populares através de APIs e integrações nativas."
    },
    {
      icon: Users,
      title: "Interface Intuitiva",
      description: "Design moderno e responsivo com suporte a temas claros e escuros para melhor experiência."
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      company: "E-commerce Plus",
      text: "Reduzimos o tempo de resposta de 2 horas para 2 minutos, aumentando as vendas em 40% no primeiro mês."
    },
    {
      name: "João Santos",
      company: "Tech Solutions",
      text: "A automação de processos economizou 20 horas semanais de trabalho manual. Investimento que valeu cada centavo."
    },
    {
      name: "Ana Costa",
      company: "Digital Marketing",
      text: "Os agentes de IA analisam dados em tempo real e fornecem insights que antes demoravam dias para obter."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mx-auto h-20 w-20 bg-white rounded-full flex items-center justify-center mb-8">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                UD
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              urbanDev
            </h1>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-white mb-8">
              Agentes de IA para Pequenos e Médios Negócios
            </h2>
            
            <p className="text-lg sm:text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Plataforma completa que oferece soluções de Inteligência Artificial especializadas, 
              com integração nativa ao Flowise para criação e gerenciamento de agentes de IA personalizados.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                onClick={() => window.location.href = "/login"}
              >
                Sou Cliente
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
                onClick={() => window.location.href = "http://localhost:3001/register"}
              >
                Cadastre-se
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Por Que Escolher urbanDev?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Democratizamos o acesso à Inteligência Artificial para empresas de pequeno e médio porte, 
              oferecendo ferramentas poderosas e fáceis de usar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cases de Sucesso
            </h2>
            <p className="text-xl text-gray-600">
              Veja como outras empresas estão transformando seus negócios com urbanDev
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto para Transformar Seu Negócio?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a mais de 500 empresas que já estão usando urbanDev para automatizar processos e impulsionar a produtividade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              onClick={() => window.location.href = "/login"}
            >
              Sou Cliente
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
              onClick={() => window.location.href = "http://localhost:3001/register"}
            >
              Cadastre-se
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">UD</span>
                </div>
                <span className="ml-2 text-xl font-bold">urbanDev</span>
              </div>
              <p className="text-gray-400">
                Plataforma de IA para Pequenos e Médios Negócios
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Agentes de IA</a></li>
                <li><a href="#" className="hover:text-white">Workflows</a></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
                <li><a href="#" className="hover:text-white">Segurança</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Documentação</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 urbanDev. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
