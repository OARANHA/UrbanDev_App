# Integração UI com Supabase

Este documento descreve a integração da interface do Flowise com o sistema de autenticação Supabase.

## Visão Geral

A integração UI com Supabase fornece:

1. **Páginas de autenticação modernas** - Interfaces de login, registro e recuperação de senha
2. **Suporte a múltiplos provedores OAuth** - Google, GitHub, Microsoft Azure
3. **Experiência unificada** - Combinação do sistema tradicional com Supabase
4. **Seleção de método de autenticação** - Interface para escolher entre métodos

## Novos Componentes

### 1. Páginas de Autenticação

#### `/signin-supabase` - Login com Supabase
- Login com email e senha via Supabase
- OAuth com Google e GitHub via Supabase
- Fallback para sistema tradicional
- Interface moderna e responsiva

#### `/register-supabase` - Registro com Supabase
- Registro com email, senha e nome
- Validação de senha forte
- OAuth para registro rápido
- Confirmação por email

#### `/forgot-password-supabase` - Recuperação de Senha
- Envio de email de redefinição
- Interface amigável
- Suporte a fallback

#### `/auth-select` - Seletor de Método
- Interface para escolher entre Supabase e tradicional
- Descrição dos recursos de cada método
- Navegação intuitiva

### 2. API Client (`/api/supabase.js`)

```javascript
import supabaseApi from '@/api/supabase'

// Métodos disponíveis
supabaseApi.supabaseSignUp({ email, password, name })
supabaseApi.supabaseSignIn({ email, password })
supabaseApi.supabaseSignInWithOAuth(provider)
supabaseApi.supabaseSignOut()
supabaseApi.supabaseGetCurrentUser()
supabaseApi.supabaseGetSession()
supabaseApi.supabaseUpdateProfile({ name, avatar })
supabaseApi.supabaseResetPassword({ email })
supabaseApi.supabaseUpdatePassword({ password })
```

### 3. Hook de Autenticação (`/hooks/useSupabaseAuth.js`)

```javascript
import useSupabaseAuth from '@/hooks/useSupabaseAuth'

const {
    user,
    loading,
    error,
    signIn,
    signUp,
    signInWithOAuth,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    getCurrentUser,
    isAuthenticated
} = useSupabaseAuth()
```

## Fluxos de Autenticação

### 1. Login

```
Usuário -> /auth-select -> Escolhe Supabase -> /signin-supabase
                                                    ↓
                                               Login com email/senha ou OAuth
                                                    ↓
                                               Supabase Auth API
                                                    ↓
                                               Sucesso: Redirecionar para /chatflows
                                               Falha: Tentar sistema tradicional
```

### 2. Registro

```
Usuário -> /auth-select -> Escolhe Supabase -> /register-supabase
                                                    ↓
                                               Preenche formulário
                                                    ↓
                                               Supabase SignUp API
                                                    ↓
                                               Sucesso: Enviar email de verificação
                                               Falha: Mostrar erro
```

### 3. Recuperação de Senha

```
Usuário -> /signin-supabase -> "Esqueceu senha?" -> /forgot-password-supabase
                                                    ↓
                                               Digita email
                                                    ↓
                                               Supabase Reset Password API
                                                    ↓
                                               Sucesso: Enviar email de redefinição
```

## Configuração

### 1. Variáveis de Ambiente

Certifique-se de que as seguintes variáveis estão configuradas no `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=your_app_url
```

### 2. Rotas do Servidor

As rotas Supabase estão disponíveis em:

```
POST /api/v1/supabase-auth/signup
POST /api/v1/supabase-auth/signin
GET  /api/v1/supabase-auth/oauth/:provider
POST /api/v1/supabase-auth/signout
GET  /api/v1/supabase-auth/user
GET  /api/v1/supabase-auth/session
PUT  /api/v1/supabase-auth/profile
POST /api/v1/supabase-auth/reset-password
PUT  /api/v1/supabase-auth/password
```

## Migração do Sistema Tradicional

### 1. Para Usuários Existentes

O sistema mantém compatibilidade com o sistema tradicional:

- Usuários existentes continuam com login tradicional
- Novos usuários podem escolher o método
- Fallback automático para sistema tradicional

### 2. Atualização de Links

Atualize os links de autenticação na aplicação:

```javascript
// Antigo
<Link to="/signin">Login</Link>

// Novo (com seletor)
<Link to="/auth-select">Login</Link>

// Ou direto para Supabase
<Link to="/signin-supabase">Login com Supabase</Link>
```

## Segurança

### 1. Proteções Implementadas

- **Validação de entrada** - Todos os campos são validados
- **Proteção CSRF** - Tokens de segurança implementados
- **Sessões seguras** - Gerenciamento via Supabase
- **OAuth seguro** - Implementação padrão OAuth 2.0

### 2. Boas Práticas

- Use HTTPS em produção
- Configure domínios permitidos no Supabase
- Implemente verificação de email
- Use senhas fortes com validação

## Personalização

### 1. Tema e Cores

As páginas usam o tema do Material-UI do projeto:

```javascript
// Personalizar cores no tema
const theme = {
    palette: {
        primary: {
            main: '#your_color'
        },
        secondary: {
            main: '#your_secondary_color'
        }
    }
}
```

### 2. Textos e Mensagens

Os textos estão em português e podem ser personalizados nos componentes:

```javascript
// Exemplo de personalização
<Typography variant='h2'>
    Seu Título Personalizado
</Typography>
```

## Testes

### 1. Testar Fluxos

1. **Login com email/senha**
   - Acessar `/signin-supabase`
   - Preencher credenciais válidas
   - Verificar redirecionamento

2. **Login OAuth**
   - Clicar em "Continuar com Google"
   - Completar fluxo OAuth
   - Verificar login bem-sucedido

3. **Registro**
   - Acessar `/register-supabase`
   - Preencher formulário
   - Verificar email de confirmação

4. **Recuperação de senha**
   - Acessar `/forgot-password-supabase`
   - Digitar email
   - Verificar email de redefinição

### 2. Testar Fallback

1. **Desativar Supabase**
   - Tentar login
   - Verificar fallback para sistema tradicional

2. **Credenciais inválidas**
   - Testar com email/senha inválidos
   - Verificar mensagem de erro

## Solução de Problemas

### 1. Problemas Comuns

**Erro: "Invalid or expired token"**
- Verificar configuração do Supabase
- Limpar cookies e cache
- Verificar variáveis de ambiente

**OAuth não funciona**
- Verificar configuração dos provedores no Supabase
- Verificar URLs de redirecionamento
- Verificar configuração de domínio

**Fallback não funciona**
- Verificar se sistema tradicional está ativo
- Verificar rotas do servidor
- Verificar configuração de autenticação

### 2. Debug

Use as ferramentas de desenvolvedor do navegador:

```javascript
// Verificar estado da autenticação
console.log(store.getState().auth)

// Verificar erros da API
.catch(error => console.error('Auth error:', error))
```

## Próximos Passos

1. **Testar em ambiente de staging**
2. **Coletar feedback dos usuários**
3. **Monitorar métricas de uso**
4. **Planejar migração completa**
5. **Documentar para equipe de suporte**

## Suporte

Para dúvidas ou problemas:

- Verificar documentação do Supabase
- Consultar logs do servidor
- Abrir issue no repositório
- Contactar equipe de desenvolvimento