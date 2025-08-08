# 🚀 Instalação Simplificada - urbanDev + Flowise

Esta é uma versão **simplificada** da instalação do urbanDev + Flowise, ideal para:

- ✅ Desenvolvimento local rápido
- ✅ Testes e experimentação
- ✅ Demonstrações sem complexidade
- ✅ Aprendizado da plataforma

## ⚡ Diferenças da Versão Enterprise

| Recurso | Versão Simplificada | Versão Enterprise |
|---------|-------------------|------------------|
| **SSO** | ❌ Não disponível | ✅ Google, GitHub, Azure, Auth0, Supabase |
| **RBAC** | ❌ Apenas admin básico | ✅ 50+ permissões granulares |
| **Workspaces** | ❌ Não disponível | ✅ Multi-tenancy completo |
| **Organizações** | ❌ Não disponível | ✅ Gestão empresarial |
| **Audit Logs** | ❌ Não disponível | ✅ Monitoramento completo |
| **API Keys** | ✅ Básico | ✅ Avançado com gestão |
| **Database** | ✅ SQLite | ✅ SQLite/PostgreSQL |
| **Instalação** | ⚡ 10-15 minutos | ⏱️ 30-45 minutos |

## 🛠️ Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git
- Sistema: Linux, macOS ou Windows (com WSL)

## 🚀 Instalação Rápida (Um Comando)

```bash
# Baixar e executar o script de instalação
curl -fsSL https://raw.githubusercontent.com/seu-usuario/urbanDev/main/install-simple.sh | bash
```

## 📋 Instalação Manual

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/urbanDev.git
cd urbanDev
```

### Passo 2: Executar Script de Instalação

```bash
chmod +x install-simple.sh
./install-simple.sh
```

### Passo 3: Iniciar as Aplicações

```bash
./start-simple.sh
```

## 🌐 Acesso às Aplicações

| Aplicação | URL | Descrição |
|-----------|-----|-----------|
| **urbanDev** | http://localhost:3000 | Frontend do projeto |
| **Flowise** | http://localhost:3001 | Plataforma de IA |

## 🔐 Configuração Inicial

### Flowise (Primeiro Acesso)

1. Acesse http://localhost:3001
2. Crie seu usuário administrador
3. Defina uma senha forte
4. Faça login com suas credenciais

### urbanDev

1. Acesse http://localhost:3000
2. Use a página de login/demo
3. Qualquer email/senha funciona para demonstração

## 📁 Estrutura de Arquivos

```
urbanDev/
├── 📄 install-simple.sh           # Script de instalação
├── 📄 start-simple.sh            # Script de inicialização
├── 📄 stop-simple.sh             # Script de parada
├── 📄 .env.local                 # Configuração urbanDev
├── 📁 src/                       # Código fonte urbanDev
└── 📁 Urbandev/
    └── 📁 flowise/               # Código fonte Flowise
        ├── 📄 .env               # Configuração Flowise
        ├── 📁 packages/          # Módulos Flowise
        └── 📁 databases/         # Banco de dados
```

## 🎮 Comandos Úteis

### Iniciar Aplicações
```bash
./start-simple.sh
```

### Parar Aplicações
```bash
./stop-simple.sh
```

### Verificar Status
```bash
# Verificar se as portas estão ativas
lsof -i :3000
lsof -i :3001
```

### Reiniciar Aplicações
```bash
./stop-simple.sh
./start-simple.sh
```

## 🔧 Configurações Personalizadas

### Alterar Portas

**urbanDev (.env.local):**
```env
# Alterar porta (padrão: 3000)
PORT=3000
```

**Flowise (Urbandev/flowise/.env):**
```env
# Alterar porta (padrão: 3001)
PORT=3001
```

### Configurar Database

**Flowise (Urbandev/flowise/.env):**
```env
# Usar PostgreSQL em vez de SQLite
DATABASE_URL=postgresql://user:password@localhost:5432/flowise
```

### Habilitar Features Adicionais

**Flowise (Urbandev/flowise/.env):**
```env
# Habilitar API Keys
APIKEY_ENABLED=true

# Habilitar Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=1000
```

## 🐛 Troubleshooting

### Porta Ocupada

```bash
# Verificar processo na porta 3000
lsof -i :3000

# Matar processo
kill -9 <PID>
```

### Problemas com Node.js

```bash
# Verificar versão
node --version
npm --version

# Instalar versão correta (usando nvm)
nvm install 18
nvm use 18
```

### Problemas com Permissões

```bash
# Dar permissão aos scripts
chmod +x install-simple.sh
chmod +x start-simple.sh
chmod +x stop-simple.sh
```

### Flowise Não Inicia

```bash
# Reinstalar dependências
cd Urbandev/flowise
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Documentação Adicional

- [Documentação Completa](GUIA_INSTALACAO_LOCAL.md) - Versão Enterprise
- [Flowise Documentation](https://docs.flowiseai.com/) - Documentação oficial
- [urbanDev Wiki](https://github.com/seu-usuario/urbanDev/wiki) - Wiki do projeto

## 🔄 Atualização

### Atualizar urbanDev
```bash
git pull origin main
npm install
```

### Atualizar Flowise
```bash
cd Urbandev/flowise
git pull origin main
npm install
npm run build
```

## 🚨 Limitações Importantes

⚠️ **Esta versão simplificada NÃO é adequada para:**

- ✗ Produção
- ✗ Ambientes empresariais
- ✗ Usuários múltiplos com permissões diferentes
- ✗ Integração com sistemas corporativos
- ✗ Requisitos de compliance e auditoria

## 🎯 Próximos Passos

### Para Desenvolvimento

1. **Explore o Flowise**: Crie seus primeiros chatbots
2. **Teste a Integração**: Conecte o Flowise com o urbanDev
3. **Customize a UI**: Modifique o frontend do urbanDev
4. **Adicione Features**: Implemente novas funcionalidades

### Para Produção

1. **Migre para Enterprise**: Use o script `install-local.sh`
2. **Configure Supabase**: Adicione autenticação real
3. **Implemente SSO**: Integre com provedores de identidade
4. **Adicione Monitoramento**: Configure logs e métricas

## 🤝 Contribuição

Quer contribuir com o projeto?

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Faça commit das suas mudanças
4. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Precisa de ajuda?**

- 📧 Email: suporte@urbandev.com
- 💬 Discord: [discord.gg/urbandev](https://discord.gg/urbandev)
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/urbanDev/issues)

---

**Versão Simplificada vs Enterprise**

Lembre-se: esta é uma versão **para desenvolvimento e testes**. Para uso em produção, recomendamos a [versão Enterprise](GUIA_INSTALACAO_LOCAL.md) com todos os recursos de segurança e escalabilidade.