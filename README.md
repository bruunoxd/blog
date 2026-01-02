# 📚 Blog School App

Aplicativo completo de blog escolar com **Backend NestJS** e **Frontend React Native/Expo**.

## 📁 Estrutura do Projeto

```
├── api-blog-school-develop/    # Backend - API NestJS
│   ├── src/                    # Código fonte
│   │   ├── post/               # Módulo de posts
│   │   ├── comment/            # Módulo de comentários
│   │   ├── person/             # Módulo de usuários
│   │   └── school-material/    # Módulo de materiais
│   ├── prisma/                 # Schema e migrações do banco
│   └── test/                   # Testes unitários e e2e
│
└── blog-school-app/            # Frontend - React Native/Expo
    └── src/
        ├── screens/            # Telas do aplicativo
        │   ├── LoginScreen.tsx
        │   ├── HomeScreen.tsx
        │   ├── CreatePostScreen.tsx
        │   ├── PostDetailScreen.tsx
        │   ├── AdminPostsScreen.tsx
        │   ├── CreateTeacherScreen.tsx
        │   ├── EditTeacherScreen.tsx
        │   ├── TeacherListScreen.tsx
        │   ├── CreateStudentScreen.tsx
        │   ├── EditStudentScreen.tsx
        │   └── StudentListScreen.tsx
        ├── navigation/         # Configuração de rotas
        └── services/           # Serviços de API
```

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (para o frontend)
- **Expo Go** (app no celular) ou emulador

---

### 1️⃣ Backend (API)

```bash
# Entrar na pasta do backend
cd api-blog-school-develop

# Instalar dependências
npm install

# Criar arquivo de ambiente
cp .env.example .env

# Gerar cliente Prisma
npx prisma generate

# Executar migrações do banco de dados
npx prisma migrate dev

# Iniciar o servidor em modo desenvolvimento
npm run start:dev
```

O servidor estará rodando em: `http://localhost:3000`

📖 **Documentação da API (Swagger):** `http://localhost:3000/api`

---

### 2️⃣ Frontend (App Mobile)

```bash
# Entrar na pasta do frontend
cd blog-school-app

# Instalar dependências
npm install

# Iniciar o Expo
npm start
```

Depois, escaneie o QR Code com o app **Expo Go** no seu celular, ou pressione:
- `a` para abrir no emulador Android
- `i` para abrir no simulador iOS (apenas macOS)
- `w` para abrir no navegador web

---

### ⚠️ Configuração de Rede (Importante!)

Para o app mobile se conectar ao backend, você precisa configurar o IP correto:

1. Descubra o IP da sua máquina:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```

2. Edite o arquivo `blog-school-app/src/services/api.ts`:
   ```typescript
   const API_URL = 'http://SEU_IP_AQUI:3000';
   ```

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados (fácil para desenvolvimento)
- **Swagger** - Documentação da API
- **Class Validator** - Validação de dados

### Frontend
- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **React Navigation** - Navegação entre telas
- **Axios** - Requisições HTTP

---

## 📱 Funcionalidades

### 🔐 Autenticação
- ✅ Tela de login com validação
- ✅ Identificação de tipo de usuário (Professor/Aluno)

### 📝 Posts (Blog)
- ✅ Visualizar lista de todos os posts
- ✅ Ver detalhes completos de um post
- ✅ **Professores:** Criar, editar e excluir posts
- ✅ **Alunos:** Apenas visualizar posts

### 💬 Comentários
- ✅ Visualizar comentários de cada post
- ✅ Adicionar novos comentários (Professores e Alunos)
- ✅ Editar e excluir comentários próprios

### 👨‍🏫 Gestão de Professores (Admin)
- ✅ Listar todos os professores
- ✅ Cadastrar novo professor
- ✅ Editar dados do professor
- ✅ Excluir professor

### 🎓 Gestão de Alunos (Admin)
- ✅ Listar todos os alunos
- ✅ Cadastrar novo aluno
- ✅ Editar dados do aluno
- ✅ Excluir aluno

### 📋 Gestão de Posts (Admin)
- ✅ Página administrativa com todos os posts
- ✅ Editar qualquer post
- ✅ Excluir qualquer post
- ✅ Visualizar status (Publicado/Rascunho)

---

## 👤 Permissões por Tipo de Usuário

| Funcionalidade | Professor | Aluno |
|----------------|:---------:|:-----:|
| Ver posts | ✅ | ✅ |
| Ver detalhes do post | ✅ | ✅ |
| Criar post | ✅ | ❌ |
| Editar post | ✅ | ❌ |
| Excluir post | ✅ | ❌ |
| Comentar em posts | ✅ | ✅ |
| Gerenciar professores | ✅ | ❌ |
| Gerenciar alunos | ✅ | ❌ |
| Gerenciar posts (admin) | ✅ | ❌ |

---

## 🧪 Testes

```bash
# No diretório do backend
cd api-blog-school-develop

# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

---

## 📝 Endpoints da API

### Posts
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /post/all | Lista todos os posts |
| GET | /post/:id | Busca post por ID |
| POST | /post | Cria novo post |
| PATCH | /post/:id | Atualiza post |
| DELETE | /post/:id | Remove post |

### Comentários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /comment/all/:postId | Lista comentários do post |
| POST | /comment | Cria comentário |
| PATCH | /comment/:id | Atualiza comentário |
| DELETE | /comment/:id | Remove comentário |

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /person | Lista todos os usuários |
| GET | /person/:id | Busca usuário por ID |
| POST | /person | Cadastra usuário |
| POST | /person/login | Login do usuário |
| PATCH | /person/:id | Atualiza usuário |
| DELETE | /person/:id | Remove usuário |

---

## 📸 Telas do Aplicativo

1. **Login** - Autenticação de usuários
2. **Home** - Lista de posts com botões admin (professores)
3. **Detalhes do Post** - Visualização completa com comentários
4. **Criar Post** - Formulário para novos posts
5. **Gerenciar Professores** - CRUD de professores
6. **Gerenciar Alunos** - CRUD de alunos
7. **Gerenciar Posts** - Administração de todas as postagens

---

## 👥 Autores

- Bruno Garcia
- Misael
- Jorge
- Armando
- Gabriel

---

## 📄 Licença

Este projeto está sob a licença MIT.
