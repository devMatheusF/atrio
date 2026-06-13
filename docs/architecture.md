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
app/
  (auth)/
    login/
      page.tsx
  (with-header)/
    page.tsx
    criar-evento/
      page.tsx
    (user)/
      meus-eventos/
        page.tsx
        [id]/
          page.tsx
  api/
    ...
  components/
    <dominio>/
      ...
  infrastructure/
    database/
      prisma.ts
    services/
      <dominio>/
        Prisma<Domain>Service.ts
    payments/
      ...
    mail/
      ...
    outbox/
      ...
  lib/
    prisma/
      index.ts
  services/
    factory.ts
    <dominio>/
      <Domain>Service.ts
      types.ts
  store/
    ...
  shared/
    components/
    hooks/
    types/
    validation/
  theme/
    ...
```

Páginas ficam sempre em `app/...`, seguindo a convenção do App Router.
Componentes de página ficam em `app/components/<dominio>`.
Componentes compartilhados ficam em `app/shared/components`.
Validações reutilizáveis ficam em `app/shared/validation`.
Estado global fica em `app/store` ou em `app/shared` quando for transversal.

Serviços seguem uma separação explícita:
- `app/services`: contratos da aplicação, tipos de entrada/saída e factory.
- `app/infrastructure`: implementações concretas e adaptadores técnicos.
- `app/lib`: helpers internos compartilhados, como o singleton do Prisma.

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
  - Reaproveitar componentes de domínio através de `app/components/<dominio>`, mantendo `page.tsx` minimalista e apenas orquestrando.
  

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
    Eventos
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
      - Tickets
      - Comprar tickets.
      - Receber ticket por e-mail (integração SMTP).

    Visualizar tickets:
      - Ativos (evento ainda vai acontecer),
      - Utilizados (evento já passou),
      - Todos.
      - Validar ticket via QR Code na portaria (futuro).
      - Pedidos / Checkout

    Processo de checkout com:
      - PIX.
      - Cartão de crédito/débito.
      - Integração com gateway de pagamento.
      - Exibir lista de pedidos do usuário.

    Conta / Autenticação:
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
    Stores de domínio (ex: useEventFiltersStore, useCartStore) devem ficar em `app/store`.
    Stores transversais compartilhadas podem ficar em `app/shared` quando fizer sentido.
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

## 7. Services e Infrastructure

  # 7.1. Objetivo
    A aplicação não deve espalhar Prisma, SMTP, gateways de pagamento ou clients externos por páginas, componentes, actions ou route handlers.
    O acesso a dependências técnicas deve passar por contratos em `app/services` e implementações em `app/infrastructure`.

  # 7.2. Contratos em app/services
    `app/services` define o que a aplicação precisa fazer, sem acoplar a detalhes técnicos.

    Exemplo:
    ```
    app/services/users/UserService.ts
    app/services/users/types.ts
    app/services/factory.ts
    ```

    Regras:
    - Definir interfaces pequenas por domínio.
    - Tipar entradas e saídas explicitamente.
    - Não importar Prisma Client diretamente.
    - Não chamar gateways, SMTP ou APIs externas diretamente.
    - Expor os services por uma factory central.

  # 7.3. Implementações em app/infrastructure
    `app/infrastructure` contém detalhes concretos: Prisma, adapters de gateway, SMTP, outbox, storage, auth provider e verificadores de webhook.

    Exemplo:
    ```
    app/infrastructure/services/users/PrismaUserService.ts
    app/infrastructure/payments/MercadoPagoPaymentService.ts
    app/infrastructure/mail/SmtpMailClient.ts
    app/infrastructure/outbox/PrismaOutboxRepository.ts
    ```

    Regras:
    - Implementações podem importar `app/lib/prisma`.
    - Implementações devem cumprir os contratos definidos em `app/services`.
    - Dependências externas devem ser injetáveis quando isso facilitar testes.
    - Testes unitários devem mockar as dependências externas, como Prisma Client, gateway ou SMTP.

  # 7.4. Factory de services
    `app/services/factory.ts` centraliza a criação dos services concretos.
    Páginas, route handlers e server actions devem consumir a factory, não instanciar implementações diretamente.

    Exemplo conceitual:
    ```
    import { services } from "@/app/services/factory";

    const user = await services.users.findByEmail({ email });
    ```

  # 7.5. Regra de dependência
    Fluxo esperado:
    ```
    pages/actions/api
      -> app/services
      -> app/infrastructure
      -> Prisma / SMTP / Gateway / APIs externas
    ```

    O sentido inverso deve ser evitado. `app/services` não deve depender de `app/infrastructure`.


## 8. Formulários e validação (React Hook Form + Zod + MUI)
  Padrão único para formulários:
    - React Hook Form para gerenciamento de formulário.
    - Zod para schemas de validação.
    - MUI para os componentes visuais.

  Diretrizes:
    - Todo formulário deve ter um schema Zod correspondente em:
      - `app/shared/validation/<domínio>` quando for reutilizável;
      - próximo ao componente somente quando for extremamente específico e sem reutilização prevista.

  Dentro do componente de formulário:
    - Usar useForm com zodResolver(schema).
    - Integrar inputs MUI via Controller quando necessário.
  
  Os formulários devem ser, preferencialmente, Client Components (com "use client" no topo).


## 9. UI e Design System (MUI + Storybook)
  Usaremos MUI como base do design system, com customizações próprias.
  Storybook é usado para documentar componentes reutilizáveis.
  
  Regras:
    - Componentes atômicos / reutilizáveis (botões, tipografia, cards base, inputs genéricos) vão para app/shared/ui.
    - Cada componente compartilhado relevante deve ter uma story em app/shared/ui/__stories__ ou estrutura equivalente usada pelo projeto.
    - Páginas (page.tsx) não devem conter layout complexo “hard-coded”; devem compor layouts a partir dos componentes de shared/ui e de features.


## 10. Integrações externas
  # 9.1. Envio de e-mail (SMTP)
    Será implementado em `app/infrastructure/mail`, exposto por contrato em `app/services`.
    A UI deve apenas:
      - Chamar um endpoint POST /api/email/ticket (nome sujeito a mudança).
      - Exibir feedback de sucesso/erro.

  # 9.2. Gateway de pagamento
    Checkout via PIX e cartão de crédito/débito.
    A UI deve:
      - Orquestrar o fluxo de checkout (steps, validações).
      - Chamar endpoints específicos de pagamento (nome e formato a definir).
      - Nunca manipular diretamente dados sensíveis de cartão além do necessário para o gateway.


## 11. Regras gerais para contribuições
  Estas regras são importantes tanto para desenvolvedores humanos quanto para assistentes (ex: Codex).
  Ao criar uma nova feature ou ajustar uma existente:
    - Identifique o domínio (events, tickets, orders, auth, account).

  Crie/ajuste arquivos em:
    - app/... → apenas páginas e layout.
    - app/components/<domínio>/... → componentes específicos de página/domínio.
    - app/services/<domínio>/... → contratos de services e tipos.
    - app/infrastructure/... → implementações concretas e adapters técnicos.
    - app/lib/... → helpers compartilhados e clients internos.

  Se for formulário, sempre:
    - Criar/ajustar schema Zod.
    - Usar React Hook Form + MUI.

  Se envolver estado global, criar ou reutilizar store em:
    app/store ou app/shared quando for transversal.

  Seguir padrões de tipagem e nomenclatura estabelecidos neste arquivo e nos docs complementares (ex: docs/ui.md, docs/forms.md, etc., quando existirem).
