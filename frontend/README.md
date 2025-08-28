# 📋 Gestor de Tarefas

Um sistema completo de gerenciamento de tarefas com interface moderna, autenticação e preparado para integração com WhatsApp via Evolution API.

## 🚀 Funcionalidades

### ✅ Implementadas
- **Autenticação completa**: Login e cadastro de usuários
- **CRUD de tarefas**: Criar, editar, excluir e visualizar tarefas
- **Filtros e busca**: Filtrar por status e pesquisar tarefas
- **Interface responsiva**: Design moderno e adaptável
- **Modo escuro**: Tema escuro/claro com persistência
- **Validações**: Validação de formulários e dados
- **Notificações**: Sistema de mensagens para feedback
- **Persistência local**: Dados salvos no localStorage

### 🔄 Em Desenvolvimento
- **Backend Node.js**: API REST com Express
- **Banco de dados**: MongoDB/PostgreSQL
- **Autenticação JWT**: Tokens seguros
- **Evolution API**: Notificações via WhatsApp
- **Deploy**: Frontend e backend em produção

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript ES6+**: Funcionalidades interativas
- **LocalStorage**: Persistência de dados local

### Backend (Próxima fase)
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **MongoDB/PostgreSQL**: Banco de dados
- **JWT**: Autenticação
- **Evolution API**: Integração WhatsApp

## 📁 Estrutura do Projeto

```
frontend/
├── index.html          # Página de login/cadastro
├── home.html           # Lista de tarefas
├── task-form.html      # Formulário de tarefas
├── css/
│   └── style.css       # Estilos da aplicação
├── js/
│   ├── auth.js         # Lógica de autenticação
│   ├── tasks.js        # Gerenciamento de tarefas
│   └── task-form.js    # Formulário de tarefas
└── README.md           # Documentação
```

## 🎯 Como Usar

### 1. Acesso ao Sistema
- **URL**: Abra `index.html` no navegador
- **Login padrão**: 
  - Email: `admin@teste.com`
  - Senha: `123456`

### 2. Criar Tarefa
1. Clique em "➕ Nova Tarefa"
2. Preencha os campos obrigatórios:
   - Nome da tarefa
   - Data de vencimento
3. Opcionalmente adicione:
   - Descrição
   - Prioridade
   - Horário
   - Notificação WhatsApp
4. Clique em "💾 Salvar Tarefa"

### 3. Gerenciar Tarefas
- **Filtrar**: Use os botões de filtro (Todas, Pendentes, etc.)
- **Pesquisar**: Digite na barra de pesquisa
- **Editar**: Clique em "✏️ Editar"
- **Excluir**: Clique em "🗑️ Excluir"

### 4. Configurações
- **Modo escuro**: Clique no botão "🌙 Modo Escuro"
- **Logout**: Clique em "👤 Sair"

## 🔧 Configuração para Desenvolvimento

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (opcional, para desenvolvimento)

### Instalação
1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd frontend
```

2. Abra o projeto:
```bash
# Opção 1: Abrir diretamente no navegador
open index.html

# Opção 2: Usar servidor local (recomendado)
python -m http.server 8000
# ou
npx serve .
```

3. Acesse: `http://localhost:8000`

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🎨 Design System

### Cores
- **Primária**: `#667eea` (Azul)
- **Secundária**: `#764ba2` (Roxo)
- **Sucesso**: `#28a745` (Verde)
- **Perigo**: `#dc3545` (Vermelho)
- **Aviso**: `#ffc107` (Amarelo)

### Tipografia
- **Família**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Tamanhos**: 14px (base), 16px (inputs), 18px (títulos)

### Componentes
- **Botões**: Bordas arredondadas, hover effects
- **Inputs**: Focus states, validação visual
- **Cards**: Sombras, bordas arredondadas
- **Status**: Badges coloridos para diferentes estados

## 🔒 Segurança

### Implementado
- Validação de formulários no frontend
- Sanitização de dados
- Verificação de autenticação

### Próximas implementações
- Autenticação JWT
- Criptografia de senhas
- Middleware de segurança
- Rate limiting

## 🚀 Próximos Passos

### Fase 2: Backend
1. **Setup Node.js + Express**
2. **Configuração do banco de dados**
3. **Implementação das APIs**
4. **Autenticação JWT**

### Fase 3: Integração
1. **Conectar frontend ↔ backend**
2. **Evolution API para WhatsApp**
3. **Sistema de notificações**
4. **Testes e otimizações**

### Fase 4: Deploy
1. **Backend no Render/Railway**
2. **Frontend no Vercel**
3. **Configuração de domínio**
4. **Monitoramento**

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Perfil](https://linkedin.com/in/seu-perfil)

## 🙏 Agradecimentos

- Evolution API para integração WhatsApp
- Comunidade JavaScript
- Tutoriais e documentações que inspiraram este projeto

---

**⭐ Se este projeto te ajudou, considere dar uma estrela!**
