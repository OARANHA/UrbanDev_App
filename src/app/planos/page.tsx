"use client"
import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Zap, 
  Crown,
  Rocket,
  Users,
  Shield,
  Database,
  Cpu,
  Network,
  BarChart3,
  MessageSquare,
  Workflow,
  Target,
  Lightbulb,
  TrendingUp,
  Clock,
  Headphones,
  Globe,
  Lock,
  Award,
  Sparkles,
  Infinity,
  Scale
} from "lucide-react"
import Link from "next/link"

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfeito para pequenos negócios começando com automação inteligente",
    price: "R$ 297",
    period: "/mês",
    popular: false,
    color: "from-blue-600 to-blue-700",
    badge: null,
    features: [
      { icon: Users, title: "1 Agente de IA", description: "Agente especializado à sua escolha" },
      { icon: MessageSquare, title: "2.000 interações/mês", description: "Ideal para atendimento básico" },
      { icon: Cpu, title: "GLM-4.5-Flash", description: "Modelo de linguagem avançado" },
      { icon: Network, title: "3 integrações", description: "WhatsApp, Email, Site" },
      { icon: BarChart3, title: "Analytics básico", description: "Relatórios simples de desempenho" },
      { icon: Clock, title: "Suporte por email", description: "Resposta em 24h úteis" },
      { icon: Database, title: "Armazenamento 5GB", description: "Dados e conversas" },
      { icon: Shield, title: "Segurança básica", description: "Criptografia de dados" }
    ],
    cta: "Começar Agora",
    ctaLink: "/contato"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Para negócios em crescimento que precisam de mais potência",
    price: "R$ 597",
    period: "/mês",
    popular: true,
    color: "from-purple-600 to-purple-700",
    badge: { text: "Mais Popular", icon: Zap },
    features: [
      { icon: Users, title: "3 Agentes de IA", description: "Múltiplos especialistas" },
      { icon: MessageSquare, title: "10.000 interações/mês", description: "Volume médio de atendimento" },
      { icon: Cpu, title: "GLM-4.5-Turbo", description: "Modelo premium com raciocínio avançado" },
      { icon: Network, title: "10 integrações", description: "CRM, ERP, Redes sociais e mais" },
      { icon: BarChart3, title: "Analytics avançado", description: "Dashboard completo com métricas" },
      { icon: Headphones, title: "Suporte prioritário", description: "Chat e telefone 8h-18h" },
      { icon: Database, title: "Armazenamento 50GB", description: "Escalável conforme necessidade" },
      { icon: Shield, title: "Segurança avançada", description: "2FA e monitoramento 24/7" },
      { icon: Workflow, title: "Automação de workflows", description: "Fluxos personalizados" },
      { icon: Target, title: "Segmentação avançada", description: "Personalização por cliente" }
    ],
    cta: "Experimentar Agora",
    ctaLink: "/contato"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Solução completa para grandes operações e necessidades customizadas",
    price: "Custom",
    period: "",
    popular: false,
    color: "from-orange-600 to-orange-700",
    badge: { text: "Premium", icon: Crown },
    features: [
      { icon: Users, title: "Agentes ilimitados", description: "Quantos precisar" },
      { icon: MessageSquare, title: "Interações ilimitadas", description: "Sem limites de volume" },
      { icon: Cpu, title: "Modelos customizados", description: "Fine-tuning específico" },
      { icon: Network, title: "Integrações ilimitadas", description: "APIs e sistemas customizados" },
      { icon: BarChart3, title: "Analytics empresarial", description: "BI e insights preditivos" },
      { icon: Headphones, title: "Suporte 24/7 dedicado", description: "Gerente de conta exclusivo" },
      { icon: Database, title: "Armazenamento ilimitado", description: "Infraestrutura dedicada" },
      { icon: Shield, title: "Segurança enterprise", description: "SOC 2, ISO 27001" },
      { icon: Workflow, title: "Workflows complexos", description: "Automação multi-sistemas" },
      { icon: Scale, title: "Escalabilidade infinita", description: "Cresça sem limites" },
      { icon: Lock, title: "SLA garantido", description: "99.9% uptime" },
      { icon: Award, title: "Consultoria estratégica", description: "Otimização contínua" }
    ],
    cta: "Falar com Especialista",
    ctaLink: "/contato"
  }
]

const comparisonData = [
  {
    feature: "Agentes de IA",
    starter: "1 Agente",
    professional: "3 Agentes",
    enterprise: "Ilimitados"
  },
  {
    feature: "Interações/mês",
    starter: "2.000",
    professional: "10.000",
    enterprise: "Ilimitadas"
  },
  {
    feature: "Modelo de IA",
    starter: "GLM-4.5-Flash",
    professional: "GLM-4.5-Turbo",
    enterprise: "Customizados"
  },
  {
    feature: "Integrações",
    starter: "3 básicas",
    professional: "10 avançadas",
    enterprise: "Ilimitadas"
  },
  {
    feature: "Analytics",
    starter: "Básico",
    professional: "Avançado",
    enterprise: "Empresarial"
  },
  {
    feature: "Suporte",
    starter: "Email 24h",
    professional: "Prioritário 8h-18h",
    enterprise: "24/7 dedicado"
  },
  {
    feature: "Segurança",
    starter: "Criptografia básica",
    professional: "2FA + Monitoramento",
    enterprise: "Enterprise + Compliance"
  },
  {
    feature: "Customização",
    starter: "Limitada",
    professional: "Avançada",
    enterprise: "Total"
  }
]

const useCases = [
  {
    icon: MessageSquare,
    title: "Atendimento ao Cliente",
    description: "Resolva problemas 24/7 com agentes que entendem contexto e aprendem com cada interação",
    roi: "+300% eficiência",
    implementation: "2 semanas"
  },
  {
    icon: Users,
    title: "Automação de Vendas",
    description: "Qualifique leads, agende reuniões e feche negócios com agentes de vendas especializados",
    roi: "+250% conversão",
    implementation: "3 semanas"
  },
  {
    icon: BarChart3,
    title: "Análise de Dados",
    description: "Transforme dados brutos em insights acionáveis com agentes analíticos inteligentes",
    roi: "+400% produtividade",
    implementation: "1 semana"
  },
  {
    icon: Workflow,
    title: "Operações Internas",
    description: "Automatize processos complexos e gerencie workflows com agentes operacionais",
    roi: "+350% otimização",
    implementation: "4 semanas"
  }
]

const technologies = [
  {
    name: "GLM-4.5",
    description: "Modelos de linguagem de última geração",
    icon: Cpu
  },
  {
    name: "FlowiseAI",
    description: "Plataforma visual de workflow",
    icon: Network
  },
  {
    name: "Supabase",
    description: "Banco de dados e autenticação",
    icon: Database
  },
  {
    name: "Next.js",
    description: "Framework web moderno",
    icon: Rocket
  },
  {
    name: "Prisma",
    description: "ORM e gerenciamento de dados",
    icon: Database
  },
  {
    name: "Socket.io",
    description: "Comunicação em tempo real",
    icon: MessageSquare
  }
]

export default function PlanosPage() {
  const [selectedPlan, setSelectedPlan] = useState("professional")
  const [billingCycle, setBillingCycle] = useState("monthly")

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-orange-900 dark:from-blue-950 dark:via-purple-950 dark:to-orange-950">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <Badge variant="secondary" className="mb-4 text-blue-100 bg-blue-800/50 border-blue-600">
            <Star className="w-4 h-4 mr-2" />
            Planos e Preços
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-orange-100 bg-clip-text text-transparent">
            Escolha o Plano Perfeito para
            <br />
            <span className="text-orange-400">Transformar Seu Negócio</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Agentes de IA potentes, escaláveis e prontos para revolucionar suas operações. 
            Comece pequeno, cresça conforme sua necessidade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg" asChild>
              <Link href="#pricing">
                Ver Planos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800/50 font-semibold px-8 py-4 text-lg" asChild>
              <Link href="/demonstracao">
                Ver Demonstração
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
              <div className="text-blue-100">empresas atendidas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">98%</div>
              <div className="text-blue-100">taxa de satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">15min</div>
              <div className="text-blue-100">setup médio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como Nossos Agentes Podem Ajudar Seu Negócio
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubra casos de uso reais com resultados comprovados
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <useCase.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  <CardDescription className="text-base">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ROI</span>
                      <Badge variant="secondary">{useCase.roi}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Implementação</span>
                      <Badge variant="outline">{useCase.implementation}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planos Flexíveis para Cada Necessidade
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Escolha o plano que melhor se adapta ao seu negócio. Atualize ou cancele a qualquer momento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${plan.popular ? 'border-2 border-purple-500 shadow-xl scale-105' : 'border-border'} hover:shadow-xl transition-all duration-300`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className={`${plan.popular ? 'bg-purple-500' : 'bg-orange-500'} text-white px-4 py-2`}>
                      <plan.badge.icon className="w-3 h-3 mr-1" />
                      {plan.badge.text}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                    {plan.id === 'starter' && <Rocket className="h-8 w-8 text-white" />}
                    {plan.id === 'professional' && <Zap className="h-8 w-8 text-white" />}
                    {plan.id === 'enterprise' && <Crown className="h-8 w-8 text-white" />}
                  </div>
                  
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-base px-4">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mt-6">
                    <div className="text-4xl font-bold">{plan.price}</div>
                    <div className="text-muted-foreground">{plan.period}</div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <feature.icon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">{feature.title}</div>
                          <div className="text-xs text-muted-foreground">{feature.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full mt-6 ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : plan.id === 'enterprise' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3`}
                    asChild
                  >
                    <Link href={plan.ctaLink}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comparação Detalhada
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Veja exatamente o que está incluído em cada plano
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="bg-background rounded-lg shadow-lg overflow-hidden border">
              <div className="grid grid-cols-4 gap-0">
                <div className="p-4 border-b font-semibold">Funcionalidade</div>
                <div className="p-4 border-b font-semibold text-center text-blue-600">Starter</div>
                <div className="p-4 border-b font-semibold text-center text-purple-600">Professional</div>
                <div className="p-4 border-b font-semibold text-center text-orange-600">Enterprise</div>
              </div>
              
              {comparisonData.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-0">
                  <div className="p-4 border-r border-b font-medium">{item.feature}</div>
                  <div className="p-4 border-r border-b text-center text-sm">{item.starter}</div>
                  <div className="p-4 border-r border-b text-center text-sm font-medium text-purple-600">{item.professional}</div>
                  <div className="p-4 border-b text-center text-sm font-medium text-orange-600">{item.enterprise}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tecnologia de Ponta
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Construído com as tecnologias mais avançadas do mercado
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <tech.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{tech.name}</CardTitle>
                  <CardDescription className="text-base">
                    {tech.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tudo que você precisa saber sobre nossos planos
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso mudar de plano a qualquer momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Sim! Você pode atualizar ou diminuir seu plano a qualquer momento. 
                  As mudanças são aplicadas no próximo ciclo de cobrança.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quanto tempo leva para configurar os agentes?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  A configuração inicial leva em média 15 minutos. Nossa equipe de suporte 
                  está disponível para ajudar com personalizações mais complexas.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Os agentes aprendem com meu negócio?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Sim! Nossos agentes utilizam aprendizado contínuo para se adaptar ao seu 
                  negócio, melhorando seu desempenho com cada interação.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Oferecem treinamento para minha equipe?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Sim! Todos os planos incluem materiais de treinamento. Os planos 
                  Professional e Enterprise incluem sessões de treinamento personalizadas.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Transformar Seu Negócio?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já estão revolucionando suas operações com IA
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg" asChild>
              <Link href="/contato">
                Falar com Especialista
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg" asChild>
              <Link href="/demonstracao">
                Ver Demonstração
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}