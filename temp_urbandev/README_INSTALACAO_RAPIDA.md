# 🚀 Instalação Rápida - urbanDev + Flowise

## 📋 O que você precisa

1. **Node.js 18+** - Baixe em https://nodejs.org
2. **Conta Supabase** - Crie gratuitamente em https://supabase.com
3. **Git** (opcional) - Para clonar o repositório

## 🔑 Configurar Supabase (5 minutos)

1. Acesse https://supabase.com e crie um novo projeto
2. Vá em **Settings** → **API** e copie:
   - **Project URL**
   - **anon public key** 
   - **service_role key**
3. Vá em **Authentication** → **Providers** e ative:
   - **Email** (já vem ativo)
   - **Google** (opcional)

## 📦 Baixar e Configurar

### 1. Baixar o projeto
```bash
# Se tiver Git
git clone <URL_DO_REPOSITORIO>
cd urbandev

# Ou faça download manual do ZIP e extraia
```

### 2. Configurar variáveis de ambiente

Crie o arquivo `.env.local` na raiz do projeto:
```env
# URLs do Flowise
NEXT_PUBLIC_FLOWISE_URL=http://localhost:3001
FLOWISE_API_URL=http://localhost:3001/api

# Configuração Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui

# Configuração básica
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=uma-chave-secreta-longa-aqui

# Configuração Enterprise
NEXT_PUBLIC_SSO_ENABLED=true
NEXT_PUBLIC_PLATFORM_TYPE=enterprise
```

Crie o arquivo `Urbandev/flowise/.env`:
```env
# Configurações Flowise
PORT=3001
PLATFORM_TYPE=ENTERPRISE
SSO_ENABLED=true
SSO_PROVIDERS=supabase

# Configuração Supabase (MESMO VALORES)
SSO_SUPABASE_URL=sua_url_aqui
SSO_SUPABASE_ANON_KEY=sua_chave_anon_aqui
SSO_SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui

# Database
DATABASE_URL=file:././flowise.db
SESSION_SECRET=uma-chave-secreta-longa-aqui
```

### 3. Instalar dependências
```bash
# Instalar urbanDev
npm install

# Instalar Flowise
cd Urbandev/flowise
npm install
cd ../..
```

### 4. Configurar banco de dados
```bash
npm run db:push
```

## 🚀 Iniciar as Aplicações

### Terminal 1 - urbanDev (porta 3000)
```bash
npm run dev
```
Acesse: http://localhost:3000

### Terminal 2 - Flowise (porta 3001)
```bash
cd Urbandev/flowise
npm start
```
Acesse: http://localhost:3001

## 🧪 Testar

1. **Testar urbanDev**: Acesse http://localhost:3000
2. **Testar Flowise**: Acesse http://localhost:3001
3. **Testar integração**: 
   - Faça login no urbanDev
   - Clique em "Sou Cliente"
   - Você será redirecionado para o Flowise já logado

## 🎯 Sobre a Lógica de Login

### Versão Atual (Supabase)
- ✅ Login real com banco de dados
- ✅ SSO com Google, GitHub
- ✅ Recuperação de senha
- ✅ Seguro e production-ready

### Versão Simplificada (lpage.tsx)
- ⚡ Simulação rápida (aceita qualquer email/senha)
- 🎭 Apenas para demonstrações
- 🚫 Não usar em produção

## 🐛 Problemas Comuns

### Porta ocupada
```bash
# Matar processos nas portas 3000 e 3001
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Limpar cache
```bash
# Limpar cache do Next.js
rm -rf .next

# Limpar cache do npm
npm cache clean --force
```

### Erros de Supabase
- Verifique se as URLs estão corretas
- Verifique se os provedores estão ativos
- Configure as URLs de redirect:
  - Site URL: http://localhost:3000
  - Redirect URLs: http://localhost:3001/api/v1/auth/supabase/callback

## 🎉 Pronto!

Você agora tem:
- ✅ Landing page profissional
- ✅ Sistema de autenticação completo
- ✅ Plataforma de agentes de IA Enterprise
- ✅ Integração SSO entre as plataformas
- ✅ Tudo rodando localmente para desenvolvimento

---

**Tempo total de instalação**: 15-30 minutos
**Dificuldade**: Média
**Requisitos**: Node.js, Supabase

Parabéns! 🎊