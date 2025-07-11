# Pluga Challenge Front

Bem-vindo ao **Pluga Challenge Front** – uma aplicação Next.js 15 construída para o desafio técnico da Pluga. O objetivo é listar integrações ("apps") provenientes de uma API pública, permitindo busca, paginação e visualização de detalhes em um modal.

---

## ✨ Principais funcionalidades

1. **Listagem de Apps** – exibe cartões com nome, cor e ícone.
2. **Busca em tempo real** – filtra localmente enquanto o usuário digita.
3. **Paginação** – 12 itens por página, com navegação.
4. **Modal de detalhes** – mostra informações do app selecionado e histórico das últimas 3 visualizações.
5. **UX/Design** – estilizado com Tailwind CSS + DaisyUI.
6. **Testes unitários** – Jest + React Testing Library cobrindo componentes, contextos, serviços e páginas.

---

## 🗂️ Estrutura de pastas

```text
src/
├─ app/                # Rotas do Next (app router)
│  └─ page.tsx         # Página inicial renderizando <ItemList />
├─ components/         # Componentes reutilizáveis
│  ├─ …                # CardApp, ModalApp, Pagination, Header, etc.
│  └─ __tests__/       # Testes de cada componente
├─ contexts/           # React Context API
│  └─ main-context.tsx # Estado global (apps, busca, página, modal…)
│     __tests__/       # Testes do contexto
├─ services/           # Acesso externo (Axios)
│  └─ api.ts           # Instância pré-configurada
│     __tests__/       # Teste da configuração
└─ utils/              # (reservado para utilitários futuros)
```

---

## 🛠️ Tecnologias & dependências principais

| Tecnologia                | Versão |
|---------------------------|---------|
| Next.js                   | 15.3.x |
| React                     | 19.x   |
| TypeScript                | 5.x    |
| Tailwind CSS + DaisyUI    | 4.x / 5.x |
| Axios                     | 1.x    |
| Jest + ts-jest            | 29.x   |
| React Testing Library     | 16.x   |
| ES Lint (+ next config)   | 9.x    |

Todas as versões encontram-se em `package.json`.

---

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env.local` na raiz com:

```env
# URL da API que retorna a lista de apps (JSON)
NEXT_PUBLIC_PLUGA_API_URL=API_ACESSO_PLUGA
```

> O prefixo **NEXT_PUBLIC_** torna a variável acessível no browser.

---

## 🚀 Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis no .env.local (ver acima)

# 3. Ambiente de desenvolvimento com HMR
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

---

## 📦 Build de produção

```bash
# Gera a versão otimizada
npm run build

# Inicia o servidor Next em modo produção
npm start
```

---

## 🔬 Testes

```bash
# Executa todos os testes uma vez
npm test

# Modo watch interativo
npm run test:watch

# Cobertura de código (html em coverage/lcov-report/index.html)
npm run test:coverage
```

Os testes cobrem:

- Serviços (`src/services/`)
- Contextos (`src/contexts/`)
- Componentes (`src/components/`)
- Página inicial (`src/app/`)

Relatório completo exibido no terminal.


## 💡 Decisões de arquitetura

- **Context API**: suficiente para o escopo do app, evitando lib externa (Redux, Zustand…).
- **Axios instance**: facilita a requisição e centraliza todas na `baseURL`.
- **Tailwind CSS + DaisyUI**: fácil utilização e simplicidade de código.
- **Test-Driven Development**: testes escritos para cada camada.

## O link público de acesso ao site no ar é:

- https://pluga-challenge-front.vercel.app/
