import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  Bot, 
  Zap, 
  Users, 
  TrendingUp, 
  CheckCircle,
  BarChart3,
  MessageSquare,
  Workflow,
  Target,
  Lightbulb,
  Shield
} from "lucide-react"
import Link from "next/link"
import { ChatWidget } from "@/components/chat-widget"
import { SimpleChat } from "@/components/simple-chat"
import { ROICalculator } from "@/components/roi-calculator"

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-orange-900 dark:from-blue-950 dark:via-blue-900 dark:to-orange-950">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <Badge variant="secondary" className="mb-4 text-blue-100 bg-blue-800/50 border-blue-600">
            <Zap className="w-4 h-4 mr-2" />
            Inovação em IA para Negócios
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-orange-100 bg-clip-text text-transparent">
            Agentes de IA que
            <br />
            <span className="text-orange-400">Transformam Negócios</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            "A inteligência artificial não é o futuro, é o presente. Quem não se adaptar, ficará para trás." 
            <span className="block text-sm text-blue-200 mt-2">- Satya Nadella, CEO da Microsoft</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg" asChild>
              <Link href="/planos">
                Começar Agora
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
              <div className="text-3xl font-bold text-orange-400 mb-2">87%</div>
              <div className="text-blue-100">de aumento em produtividade</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-blue-100">suporte automatizado</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">3x</div>
              <div className="text-blue-100">mais rápido que humanos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sua Empresa Está Preparada para a Revolução da IA?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enquanto grandes corporações já utilizam IA para dominar seus mercados, 
              pequenos e médios negócios ficam para trás. Isso não precisa ser sua realidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                  <Target className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">O Desafio</h3>
                  <p className="text-muted-foreground">
                    Falta de tempo, recursos técnicos e conhecimento especializado impedem 
                    que PMNs aproveitem o poder da IA para crescer.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                  <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">A Solução</h3>
                  <p className="text-muted-foreground">
                    Nossos agentes de IA pré-configurados e customizáveis transformam 
                    sua operação em semanas, não anos.
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-950/50 dark:to-orange-950/50 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Cenário Real</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Uma loja de e-commerce pequena implementou nosso agente de atendimento 
                  e reduziu o tempo de resposta de 2 horas para 2 minutos, aumentando 
                  as vendas em 40% no primeiro mês.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossos Agentes de IA Trabalham para Você
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluções completas que se integram perfeitamente ao seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Bot className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Agente de Atendimento</CardTitle>
                <CardDescription>
                  Atendimento 24/7 com compreensão contextual e resolução de problemas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Respostas instantâneas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Aprendizado contínuo
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Integração com múltiplos canais
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Agente de Análise</CardTitle>
                <CardDescription>
                  Insights preditivos e análise de dados em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Previsão de tendências
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Relatórios automáticos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Recomendações estratégicas
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Workflow className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Agente de Automação</CardTitle>
                <CardDescription>
                  Automação de processos e fluxos de trabalho inteligentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Processos repetitivos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Integração com sistemas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Otimização contínua
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dados que Comprovam Nossa Eficácia
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Resultados reais de empresas que transformaram seus negócios com nossa tecnologia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Empresas atendidas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Taxa de satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2.5M</div>
              <div className="text-blue-100">Interações/mês</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15min</div>
              <div className="text-blue-100">Setup médio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Demo Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experimente Nosso Agente de IA em Ação
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Veja como nosso agente analisa dados, gera insights e toma decisões em tempo real
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <SimpleChat 
                  title="Agente de IA"
                  placeholder="Faça uma pergunta sobre nossos serviços, automação ou análise de dados..."
                  height="400px"
                />
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                      <span>Recursos em Destaque</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full">
                        <MessageSquare className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Compreensão Contextual</h4>
                        <p className="text-xs text-muted-foreground">
                          Entende o contexto e fornece respostas relevantes
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Análise de Dados</h4>
                        <p className="text-xs text-muted-foreground">
                          Gera insights e recomendações estratégicas
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Respostas Imediatas</h4>
                        <p className="text-xs text-muted-foreground">
                          Processamento em tempo real com alta precisão
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-orange-50 dark:from-purple-950/20 dark:to-orange-950/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Tecnologia Utilizada</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Modelo de IA</span>
                        <Badge variant="outline">GLM-4.5-Flash</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Processamento</span>
                        <Badge variant="outline">Tempo Real</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Precisão</span>
                        <Badge variant="outline">99.9%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Experimente fazer perguntas como:
                  </p>
                  <div className="space-y-2 text-left">
                    <div className="bg-background rounded p-2 text-xs">
                      • "Como a IA pode ajudar meu negócio a crescer?"
                    </div>
                    <div className="bg-background rounded p-2 text-xs">
                      • "Quais são os principais benefícios da automação?"
                    </div>
                    <div className="bg-background rounded p-2 text-xs">
                      • "Como funciona a análise de dados em tempo real?"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Calcule Seu Retorno sobre Investimento
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubra quanto sua empresa pode economizar com nossos agentes de IA
            </p>
          </div>
          
          <ROICalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Revolucionar Seu Negócio?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já estão transformando seus resultados com IA
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg" asChild>
              <Link href="/planos">
                Ver Planos e Preços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold px-8 py-4 text-lg" asChild>
              <Link href="/contato">
                Falar com Especialista
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Chat Widget */}
      <ChatWidget />
    </Layout>
  )
}