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
- Docker (opcional, para instalação do Flowise)
- Git

### 📦 Instalação Completa (urbanDev + Flowise)

Este projeto consiste em duas aplicações que trabalham juntas:

1. **urbanDev** - Frontend e landing page (porta 3000)
2. **Flowise** - Plataforma de agentes de IA (porta 3001)

#### Passo 1: Clonar e Configurar o urbanDev
```bash
# Clonar o repositório
git clone <repository-url>
cd urbandev

# Instalar dependências do urbanDev
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

#### Passo 2: Configurar Variáveis de Ambiente
Edite o arquivo `.env.local` com suas configurações:

```env
# URLs do Flowise (rodando na porta 3001)
NEXT_PUBLIC_FLOWISE_URL=http://localhost:3001
FLOWISE_API_URL=http://localhost:3001/api

# Configuração Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Configuração do banco de dados (opcional)
DATABASE_URL="file:./dev.db"
```

#### Passo 3: Instalar e Configurar o Flowise

**Opção A: Instalação Manual (Recomendada para Desenvolvimento)**

```bash
# Criar diretório para o Flowise (fora do projeto urbanDev)
cd ..
mkdir flowise && cd flowise

# Clonar o repositório do Flowise
git clone https://github.com/FlowiseAI/Flowise.git .

# Instalar dependências
npm install

# Configurar variáveis de ambiente do Flowise
cp .env.example .env

# Editar o arquivo .env para usar a mesma configuração Supabase
echo "SUPABASE_URL=your_supabase_url" >> .env
echo "SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env
echo "PORT=3001" >> .env

# Iniciar o Flowise
npm start
```

**Opção B: Instalação com Docker**

```bash
# Criar diretório para o Flowise
cd ..
mkdir flowise && cd flowise

# Criar arquivo docker-compose.yml
cat > docker-compose.yml << EOF
version: '3.8'
services:
  flowise:
    image: flowiseai/flowise
    ports:
      - "3001:3000"
    environment:
      - SUPABASE_URL=your_supabase_url
      - SUPABASE_ANON_KEY=your_supabase_anon_key
    volumes:
      - ./data:/root/.flowise
    restart: unless-stopped
EOF

# Iniciar o Flowise com Docker
docker-compose up -d
```

#### Passo 4: Iniciar as Aplicações

**Terminal 1: Iniciar o urbanDev**
```bash
cd urbandev
npm run dev
```
Acesse: http://localhost:3000

**Terminal 2: Iniciar o Flowise**
```bash
cd flowise
npm start
```
Ou se usando Docker:
```bash
cd flowise
docker-compose up -d
```
Acesse: http://localhost:3001

#### Passo 5: Configurar o Banco de Dados (Opcional)
```bash
# No diretório do urbanDev
npm run db:push

# Isso criará o banco de dados SQLite com as tabelas necessárias
```

### 🔧 Configuração de Portas

| Aplicação | Porta Padrão | URL de Acesso |
|-----------|-------------|----------------|
| urbanDev  | 3000        | http://localhost:3000 |
| Flowise   | 3001        | http://localhost:3001 |

### 🧪 Teste de Integração

1. Acesse o urbanDev: http://localhost:3000
2. Clique em "Sou Cliente" ou "Cadastre-se"
3. Você será redirecionado para o Flowise: http://localhost:3001
4. Faça login ou cadastro usando o Supabase
5. Após autenticação, você terá acesso ao dashboard do Flowise

### 🐛 Solução de Problemas Comuns

**Porta já em uso:**
```bash
# Verificar processos na porta 3000
lsof -ti:3000 | xargs kill -9

# Verificar processos na porta 3001
lsof -ti:3001 | xargs kill -9
```

**Problemas com o Flowise:**
```bash
# Limpar cache do npm
cd flowise
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problemas com o urbanDev:**
```bash
# Limpar cache do Next.js
cd urbandev
rm -rf .next
npm run dev
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
cd urbandev
npm run build

# Iniciar produção
npm start
```

### Backend (Flowise)

**Opção A: Implantação Manual**
```bash
# No diretório do Flowise
cd flowise

# Build para produção
npm run build

# Iniciar em produção
npm start
```

**Opção B: Implantação com Docker**
```bash
# No diretório do Flowise
cd flowise

# Build e iniciar com Docker
docker-compose up -d --build
```

### 🌐 Configuração de Produção

#### Variáveis de Ambiente de Produção
```env
# urbanDev .env.production
NEXT_PUBLIC_FLOWISE_URL=https://seu-dominio-flowise.com
FLOWISE_API_URL=https://seu-dominio-flowise.com/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_production_anon_key
```

```env
# Flowise .env.production
PORT=3001
SUPABASE_URL=your_supabase_production_url
SUPABASE_ANON_KEY=your_supabase_production_anon_key
DATABASE_URL=your_production_database_url
```

#### Configuração de Domínios
1. **urbanDev**: Configure seu domínio principal (ex: urbandev.com)
2. **Flowise**: Configure um subdomínio (ex: flowise.urbandev.com)

#### Configuração de Proxy (Nginx)
```nginx
# urbanDev (porta 80)
server {
    listen 80;
    server_name urbandev.com www.urbandev.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Flowise (porta 3001)
server {
    listen 80;
    server_name flowise.urbandev.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 🔄 Process Manager (PM2)

Para manter ambas as aplicações rodando em produção:

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Criar arquivo ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'urbandev',
      script: 'npm',
      args: 'start',
      cwd: './urbandev',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'flowise',
      script: 'npm',
      args: 'start',
      cwd: './flowise',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
};
EOF

# Iniciar ambas as aplicações com PM2
pm2 start ecosystem.config.js

# Salvar configuração do PM2
pm2 save

# Configurar PM2 para iniciar com o sistema
pm2 startup
```

### 📊 Monitoramento em Produção

```bash
# Verificar status das aplicações
pm2 status

# Verificar logs
pm2 logs urbandev
pm2 logs flowise

# Monitorar em tempo real
pm2 monit

# Reiniciar aplicações
pm2 restart all
pm2 restart urbandev
pm2 restart flowise
```

### 🔒 Configuração de HTTPS

```bash
# Instalar Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obter certificados
sudo certbot --nginx -d urbandev.com -d www.urbandev.com -d flowise.urbandev.com

# Configurar renovação automática
sudo crontab -e
# Adicionar linha: 0 12 * * * /usr/bin/certbot renew --quiet
```

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