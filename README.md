# 🤖 urbanDev - Agentes de IA para Pequenos e Médios Negócios

Uma plataforma completa que oferece soluções de Inteligência Artificial especializadas para pequenos e médios negócios, com integração nativa ao Flowise para criação e gerenciamento de agentes de IA personalizados.

## 🌟 Visão Geral

O urbanDev é uma plataforma inovadora que democratiza o acesso à Inteligência Artificial para empresas de pequeno e médio porte. Oferecemos agentes de IA pré-configurados e customizáveis que se integram perfeitamente às operações empresariais, proporcionando automação avançada, análise de dados e atendimento ao cliente 24/7.

### 🎯 Proposta de Valor

- **Acessibilidade**: Leve IA poderosa para PMNs sem necessidade de equipe técnica especializada
- **Rapidez**: Implementação em semanas, não anos
- **Escalabilidade**: Soluções que crescem junto com seu negócio
- **Integração**: Conecte-se facilmente com seus sistemas existentes

## 🚀 Tecnologias Utilizadas

### Frontend (urbanDev)
- **⚡ Next.js 15** - Framework React com App Router
- **📘 TypeScript 5** - Desenvolvimento type-safe
- **🎨 Tailwind CSS 4** - Framework CSS utilitário
- **🧩 shadcn/ui** - Componentes UI acessíveis e modernos
- **🎯 Lucide React** - Biblioteca de ícones consistente
- **🌈 Framer Motion** - Animações e transições suaves

### Backend & Integração
- **🤖 Flowise** - Plataforma para criação de agentes de IA
- **🔐 Supabase** - Autenticação e banco de dados
- **🗄️ Prisma** - ORM para operações de banco de dados
- **🔄 TanStack Query** - Gerenciamento de estado e dados
- **🐻 Zustand** - Gerenciamento de estado client-side

### IA e Automação
- **🤖 Z.ai Web Dev SDK** - Integração com modelos de linguagem avançados
- **🔍 Web Search** - Capacidades de busca e pesquisa integradas
- **📊 Análise Preditiva** - Insights baseados em dados em tempo real

## 🏗️ Arquitetura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Página principal (Landing Page)
│   ├── login/             # Sistema de autenticação
│   │   ├── page.tsx       # Login/Cadastro
│   │   └── logout/        # Logout
│   └── dashboard/         # Área do cliente (protegida)
├── components/             # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── layout.tsx        # Layout principal
│   └── flowise-integration.tsx  # Integração com Flowise
├── contexts/              # Contextos React
│   └── auth-context.tsx  # Contexto de autenticação
├── lib/                  # Utilitários e configurações
│   ├── db.ts            # Cliente Prisma
│   └── socket.ts        # Configuração WebSocket
└── hooks/               # Hooks personalizados
```

## 🎯 Funcionalidades Principais

### 1. 🏠 Landing Page Profissional
- Design responsivo com tema azul e laranja
- Seções informativas sobre benefícios da IA
- Estatísticas de impacto e cases de sucesso
- Chamadas para ação claras e direcionadas

### 2. 🔐 Sistema de Autenticação
- Login e cadastro de usuários
- Autenticação via cookies para compatibilidade com middleware
- Área de cliente protegida
- Demonstração rápida com dados de teste

### 3. 🤖 Integração Flowise
- **"Sou Cliente"**: Redirecionamento para login do Flowise (`/signin`)
- **"Cadastre-se"**: Redirecionamento para registro do Flowise (`/register`)
- SSO (Single Sign-On) entre as plataformas
- Manutenção da identidade visual urbanDev

### 4. 📊 Agentes de IA Disponíveis

#### Agente de Atendimento
- Atendimento 24/7 com compreensão contextual
- Respostas instantâneas e aprendizado contínuo
- Integração com múltiplos canais de comunicação

#### Agente de Análise
- Insights preditivos e análise de dados em tempo real
- Previsão de tendências de mercado
- Relatórios automáticos e recomendações estratégicas

#### Agente de Automação
- Automação de processos repetitivos
- Fluxos de trabalho inteligentes
- Otimização contínua de operações

## 🚀 Configuração do Ambiente

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta Supabase (para autenticação)

### Instalação
```bash
# Clonar o repositório
git clone <repository-url>
cd urbandev

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Iniciar servidor de desenvolvimento
npm run dev
```

### Variáveis de Ambiente
```env
# URLs do Flowise
NEXT_PUBLIC_FLOWISE_URL=http://localhost:3000
FLOWISE_API_URL=http://localhost:3000/api

# Configuração Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔄 Fluxo de Usuário

1. **Acesso Inicial**: Usuário visita a landing page do urbanDev
2. **Escolha de Ação**: 
   - Cliente existente → Clica em "Sou Cliente"
   - Novo usuário → Clica em "Cadastre-se"
3. **Redirecionamento**: Usuário é direcionado para o Flowise
4. **Autenticação**: Login/cadastro via Supabase
5. **Acesso ao Dashboard**: Usuário acessa a plataforma Flowise
6. **Criação de Agentes**: Utiliza as ferramentas para criar agentes personalizados

## 📈 Métricas e Resultados

### Estatísticas Comprovadas
- **87%** de aumento em produtividade
- **24/7** suporte automatizado
- **3x** mais rápido que atendimento humano
- **500+** empresas atendidas
- **98%** taxa de satisfação
- **2.5M** interações/mês
- **15min** setup médio

### Case de Sucesso
Uma loja de e-commerce pequena implementou nosso agente de atendimento e reduziu o tempo de resposta de 2 horas para 2 minutos, aumentando as vendas em 40% no primeiro mês.

## 🎨 Design e Identidade Visual

### Cores Principais
- **Azul (#4dabf7)**: Tecnologia, confiança e profissionalismo
- **Laranja (#ff922b)**: Inovação, energia e criatividade
- **Gradientes**: Combinações harmoniosas para seções destacadas

### Tipografia
- **Geist Sans**: Fonte principal para texto
- **Geist Mono**: Fonte para código e elementos técnicos

### Componentes UI
- Cards com sombras suaves e bordas arredondadas
- Botões com estados hover bem definidos
- Ícones consistentes da biblioteca Lucide
- Animações sutis com Framer Motion

## 🔧 Desenvolvimento

### Scripts Disponíveis
```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Servidor de produção
npm start

# Linting
npm run lint

# Banco de dados
npm run db:push
```

### Padrões de Código
- TypeScript strict mode ativado
- ESLint para qualidade de código
- Componentes funcionais com hooks
- Estilos com Tailwind CSS
- Responsividade mobile-first

## 🚀 Implantação

### Frontend (urbanDev)
```bash
# Build da aplicação
npm run build

# Iniciar produção
npm start
```

### Backend (Flowise)
O Flowise deve ser implantado separadamente e configurado com as mesmas credenciais Supabase para garantir a integração SSO.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **Next.js Team** - pelo framework incrível
- **Flowise** - pela plataforma de agentes de IA
- **Supabase** - pela solução de autenticação e banco de dados
- **shadcn/ui** - pelos componentes UI de alta qualidade

## 📞 Contato

- **Site**: [https://urbandev.com](https://urbandev.com)
- **Email**: contato@urbandev.com
- **Suporte**: suporte@urbandev.com

---

Built with ❤️ for small and medium businesses. Empowering companies with AI technology. 🚀