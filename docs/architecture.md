# Architecture

## 1. Visão geral
O app é uma plataforma de venda de tickets para eventos cristãos.  
Objetivo principal: oferecer uma experiência de compra simples, rápida e confiável, que também comunique a fé por meio da UI e do conteúdo.

A aplicação foi projetada para:
- Ser **mobile-first**, rápida e acessível.
- Usar **padrões modernos da web** (Next App Router, React Server Components, SSR/SSG).
- Facilitar evolução incremental (novas features, novas rotas, novos fluxos de checkout).

---

## 2. Stack de tecnologias
Tecnologias principais:

- **Next.js (App Router)**  
  - Roteamento, SSR/SSG, React Server Components.
- **React + TypeScript**
- **React Hook Form + Zod**
  - Padrão único para formulários e validação.
- **Material UI (MUI) + Storybook**
  - Design system, componentes reutilizáveis, documentação visual.
- **Zustand**
  - Estado global simples e previsível.

Regras gerais:
- Usar **TypeScript em todo o código**.
- Preferir **React Server Components** sempre que possível.
- Usar **Client Components** apenas quando:
  - Houver estado local complexo;
  - Uso de hooks específicos do browser;
  - Integração direta com RHF/Zustand/MUI.

---

## 3. Estrutura de pastas (high-level)
> **Importante para devs e assistentes (ex: Codex):**  
> Ao criar novas features, seguir SEMPRE esta estrutura.

Estrutura base esperada (pode ser ajustada conforme o projeto crescer):
```
src/
  app/
    (public)/
      page.tsx               # Home pública
      eventos/
        page.tsx             # Lista de eventos
        [id]/
          page.tsx           # Detalhe de evento
      login/
        page.tsx             # Login / autenticação
    (user)/
      meus-eventos/
        page.tsx
        [id]/
          page.tsx
      meus-pedidos/
        page.tsx
      minha-conta/
        page.tsx
    (checkout)/
      checkout/
        page.tsx
    (admin)/
      dashboard/
        page.tsx
  features/
    events/
      components/
      hooks/
      services/
      store/
      types/
    tickets/
      components/
      hooks/
      store/
      types/
    orders/
      ...
  shared/
    ui/                      # Componentes UI reutilizáveis (MUI wrappers, etc.)
    forms/                   # Helpers/forms genéricos com RHF
    store/                   # Stores genéricos (ex: userStore)
    lib/                     # Utils, formatters, helpers
    validation/              # Schemas Zod compartilhados
```
Páginas: sempre em src/app/... seguindo a convenção do App Router.
Lógica de domínio (hooks, stores, services): em src/features/<domínio>.
Componentes genéricos (botões, inputs, layouts base): em src/shared/ui.
Validações reutilizáveis: src/shared/validation.
Estado global:
  Stores específicos de domínio → src/features/<domínio>/store.
  Stores transversais (ex: usuário autenticado) → src/shared/store.

## 4. Roteamento (Next App Router)
Usamos o App Router do Next para organizar as rotas por segmentos e layouts.
Rotas principais (planejadas):

/ → app/(public)/page.tsx
/login → app/(public)/login/page.tsx
/eventos → app/(public)/eventos/page.tsx
/eventos/[id] → app/(public)/eventos/[id]/page.tsx
/meus-eventos → app/(user)/meus-eventos/page.tsx
/meus-eventos/[id] → app/(user)/meus-eventos/[id]/page.tsx
/checkout → app/(checkout)/checkout/page.tsx
/meus-pedidos → app/(user)/meus-pedidos/page.tsx
/dashboard → app/(user)/dashboard/page.tsx
/minha-conta → app/(user)/minha-conta/page.tsx
/admin-all → app/(admin)/admin-all/page.tsx

- Regras para novas rotas
  - Rotas públicas (listing/descoberta de eventos): Colocar em app/(public)/....
  - Rotas do usuário autenticado: Colocar em app/(user)/....
  - Rotas administrativas (dashboard, métricas avançadas): Colocar em app/(admin)/....
  - Reaproveitar os componentes de domínio através de features/, e manter page.tsx minimalista, apenas orquestrando.
  

## 5. Domínios e features
  # 5.1. Perfis de usuário
    Usuário comum (comprador)
      - Pode comprar tickets.
      - Pode se autenticar e gerenciar seus dados.
      - Pode promover eventos (ao adicionar informações de promotor).
    Admin (apenas eu, inicialmente)
      - Acesso ao dashboard completo.
      - Acesso a métricas agregadas, faturamento, etc.

  # 5.2. Capacidades por domínio
    Eventos (features/events)
      - Cadastrar eventos.
      - Cadastrar lotes (valores, quantidades).
      - Excluir evento (desde que não haja ingressos vendidos).
      - Listar eventos futuros.
      - Filtrar por: categoria, data, cidade.
      - Visualizar detalhes de um evento .

    Métricas por evento:
      - Ingressos disponíveis.
      - Receita prevista com sold out.
      - Total faturado.
      - Tickets (features/tickets)
      - Comprar tickets.
      - Receber ticket por e-mail (integração SMTP).

    Visualizar tickets:
      - Ativos (evento ainda vai acontecer),
      - Utilizados (evento já passou),
      - Todos.
      - Validar ticket via QR Code na portaria (futuro).
      - Pedidos / Checkout (features/orders)

    Processo de checkout com:
      - PIX.
      - Cartão de crédito/débito.
      - Integração com gateway de pagamento.
      - Exibir lista de pedidos do usuário.

    Conta / Autenticação (features/auth, features/account):
      - Autenticação de usuário. 
      - Cadastro de usuário comum.
      - Cadastro/atualização de dados de promotor de evento.
      - Gestão de dados de conta e perfil.


## 6. Estado e dados (Zustand + Next)
  # 6.1. Princípios
    Server Components para busca de dados (SSR/SSG) sempre que possível.
    Client Components para:
      - Formulários (React Hook Form).
      - Interações ricas (filtros, steps, etc.).
      - Integração direta com Zustand.

  # 6.2. Uso de Zustand
    Stores de domínio (ex: useEventFiltersStore, useCartStore) devem ficar em app/features/<domínio>/store.
    Stores globais (ex: useAuthStore) devem ficar em app/shared/store.
    Regras:
    Cada store deve ter tipo de estado definido (type State / interface State).
    Expor actions claras (setSomething, reset, etc.).
    Evitar stores “god objects”; preferir stores menores por domínio.

  Exemplo de contrato simplificado:
  ```
  interface EventFiltersState {
    search: string;
    category?: string | null;
    city?: string | null;
    dateFrom?: Date | null;
    dateTo?: Date | null;
    setSearch(value: string): void;
    setCategory(value: string | null): void;
    reset(): void;
  }
  ```


## 7. Formulários e validação (React Hook Form + Zod + MUI)
  Padrão único para formulários:
    - React Hook Form para gerenciamento de formulário.
    - Zod para schemas de validação.
    - MUI para os componentes visuais.

  Diretrizes:
    - Todo formulário deve ter um schema Zod correspondente em:
      - app/features/<domínio>/validation ou
      - app/shared/validation se for reutilizável.

  Dentro do componente de formulário:
    - Usar useForm com zodResolver(schema).
    - Integrar inputs MUI via Controller quando necessário.
  
  Os formulários devem ser, preferencialmente, Client Components (com "use client" no topo).


## 8. UI e Design System (MUI + Storybook)
  Usaremos MUI como base do design system, com customizações próprias.
  Storybook é usado para documentar componentes reutilizáveis.
  
  Regras:
    - Componentes atômicos / reutilizáveis (botões, tipografia, cards base, inputs genéricos) vão para app/shared/ui.
    - Cada componente compartilhado relevante deve ter uma story em app/shared/ui/__stories__ ou estrutura equivalente usada pelo projeto.
    - Páginas (page.tsx) não devem conter layout complexo “hard-coded”; devem compor layouts a partir dos componentes de shared/ui e de features.


## 9. Integrações externas
  # 9.1. Envio de e-mail (SMTP)
    Será implementado em uma camada de serviços (ex: API route ou backend separado).
    A UI deve apenas:
      - Chamar um endpoint POST /api/email/ticket (nome sujeito a mudança).
      - Exibir feedback de sucesso/erro.

  # 9.2. Gateway de pagamento
    Checkout via PIX e cartão de crédito/débito.
    A UI deve:
      - Orquestrar o fluxo de checkout (steps, validações).
      - Chamar endpoints específicos de pagamento (nome e formato a definir).
      - Nunca manipular diretamente dados sensíveis de cartão além do necessário para o gateway.


## 10. Regras gerais para contribuições
  Estas regras são importantes tanto para desenvolvedores humanos quanto para assistentes (ex: Codex).
  Ao criar uma nova feature ou ajustar uma existente:
    - Identifique o domínio (events, tickets, orders, auth, account).

  Crie/ajuste arquivos em:
    - app/... → apenas páginas e layout.
    - app/features/<domínio>/... → lógica de domínio, componentes específicos, stores, services.

  Se for formulário, sempre:
    - Criar/ajustar schema Zod.
    - Usar React Hook Form + MUI.

  Se envolver estado global, criar ou reutilizar store em:
    app/features/<domínio>/store ou app/shared/store.

  Seguir padrões de tipagem e nomenclatura estabelecidos neste arquivo e nos docs complementares (ex: docs/ui.md, docs/forms.md, etc., quando existirem).