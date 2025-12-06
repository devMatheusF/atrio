# State

## 1. Visão geral
  A aplicação usa **Zustand** como solução de estado global, sempre em conjunto com:

  - **Next App Router** (SSR/RSC para dados de backend sempre que possível).
  - **React Hook Form + Zod** para estado de formulários e validação.
  - **MUI** para UI.

  Princípios:

  1. **Estado global mínimo**  
    - Guardar em Zustand apenas o que realmente precisa ser compartilhado entre componentes/fluxos.
    - Estado efêmero de formulário fica em React Hook Form, não em Zustand.

  2. **Stores por domínio/feature**  
    - Não existe “um único mega-store global”.
    - Cada domínio (auth, eventos, tickets, checkout, dashboard, etc.) tem seu próprio store.

  3. **Stores acessados apenas em Client Components**  
    - Stores do Zustand **nunca** devem ser usados diretamente em Server Components.
    - Pages/layouts que consomem stores devem ser marcados com `"use client"` ou delegar para componentes client.

  ---

## 2. Estrutura de pastas para state
  Como o projeto começa em `/app`, a estrutura esperada é:

  ```
  app/
    ... (rotas e layouts do Next)
  features/
    auth/
      store/
        authStore.ts
    account/
      store/
        accountStore.ts
    events/
      store/
        eventFiltersStore.ts
        eventCreationStore.ts
    tickets/
      store/
        ticketsViewStore.ts
    orders/
      store/
        checkoutStore.ts
    dashboard/
      store/
        dashboardFiltersStore.ts
  shared/
    store/
      uiStore.ts           # estado global de UI (snackbar, modal genérico, etc.)

  Regras:
    - 1 store por arquivo, com nome descritivo:
    - authStore.ts, eventFiltersStore.ts, checkoutStore.ts, etc.
    - Stores transversais (ex: snackbar global) ficam em shared/store.
    - Stores de domínio ficam sempre em features/<domínio>/store/.


## 3. Padrões de implementação (Zustand)
  # 3.1. Forma geral da store
    Cada store deve seguir este padrão:
      ```
      // Exemplo genérico
      import { create } from 'zustand'

      type SomeState = {
        // estado
      }

      type SomeActions = {
        // ações
      }

      export type SomeStore = SomeState & SomeActions

      export const useSomeStore = create<SomeStore>()((set, get) => ({
        // estado inicial
        // ações síncronas e assíncronas
      }))
      ```

      Regras:
        - Tipar sempre com create<StoreType>().
        - Exportar apenas o hook useXxxStore, nunca expor o “store interno” diretamente.
        - Ações devem ser funções puras em cima do set/get (sem side effects bizarros; se precisar chamar API, preferir services externos e usar a ação só para sincronizar o resultado no estado).

  # 3.2. Seletores e performance
    Nos componentes, evite pegar o estado inteiro:
      ```      
      // ruim: re-render em toda mudança do store
      const state = useSomeStore()


      Prefira selecionar apenas o que o componente precisa:

      const value = useSomeStore((s) => s.value)
      const doSomething = useSomeStore((s) => s.doSomething)


      Para selecionar múltiplas coisas, considere uso de useShallow (quando o projeto tiver configurado):

      import { useShallow } from 'zustand/react/shallow'
      import { useEventFiltersStore } from '@/features/events/store/eventFiltersStore'

      const { search, category } = useEventFiltersStore(
        useShallow((s) => ({ search: s.search, category: s.category }))
      )
      ```

## 4. Quando usar Zustand vs. React Hook Form vs. Server Components
  # 4.1. Zustand
    Use Zustand para:
      - Filtros de listagem que precisam ser compartilhados (ex: filtros de eventos).
      - Estado de selecionados que passa entre telas (ex: tickets selecionados indo para checkout).
      - Passos de wizard (step atual, progresso).
      - Preferências de UI local (tab ativa, modo de exibição) quando forem relevantes para múltiplos componentes.

  # 4.2. React Hook Form (+ Zod)
    Use RHF/Zod para:
      - Controle fino do formulário (dirty, touched, erros, etc.).
      - Validação campo a campo.
      - Submissão de dados para o backend.

    Regra:
    Não espelhar o estado inteiro de formulário em Zustand. Se precisar guardar um snapshot (ex: step de wizard), salve um objeto consolidado (ex: checkoutData) em uma store, mas deixe o RHF continuar sendo o dono do estado de inputs.

  # 4.3. Server Components / SSR
    Use Server Components para:
      - Buscar listas de eventos, pedidos, dados agregados de dashboard, etc.
      - Montar a tela com dados já renderizados no servidor.
      - Depois, client components podem ler stores e manipular interações locais sem refazer a busca no servidor.

## 5. Stores por domínio
  Abaixo, o contrato e responsabilidades de cada store principal.
  Isso serve tanto para devs quanto para assistentes (Codex) entenderem onde criar / extender estado.

  # 5.1. Auth (features/auth/store/authStore.ts)
    Responsável por:
      - Autenticação do usuário (token, userId, roles).
      - Estado de carregamento e erro em operações de login/logout.
      
      Exemplo de contrato:
      ```
      export type AuthState = {
        isAuthenticated: boolean
        token: string | null
        userId: string | null
        role: 'user' | 'admin' | null
        loading: boolean
        error: string | null
      }

      export type AuthActions = {
        setAuth: (payload: { token: string; userId: string; role: 'user' | 'admin' }) => void
        clearAuth: () => void
        setLoading: (loading: boolean) => void
        setError: (error: string | null) => void
      }

      export type AuthStore = AuthState & AuthActions
      ```

      Regras:
      Pode usar persist para guardar token/role (localStorage).
      Não chamar APIs diretamente dentro da store; faça isso em services/hooks e chame ações para atualizar o estado.

  # 5.2. Conta do usuário (features/account/store/accountStore.ts)
    Responsável por:
      - Dados de perfil do usuário (nome, email, telefone, etc.).
      - Dados de promotor de eventos (CNPJ/CPF, dados bancários, etc.).
      - Estado de carregamento/erro para operações de update.

    Exemplo (contrato simplificado):
    ```
    export type UserProfile = {
      name: string
      email: string
      phone?: string
    }

    export type PromoterProfile = {
      isPromoter: boolean
      document?: string // CPF/CNPJ
      companyName?: string
      pixKey?: string
    }

    export type AccountState = {
      userProfile: UserProfile | null
      promoterProfile: PromoterProfile | null
      loading: boolean
      error: string | null
    }

    export type AccountActions = {
      setUserProfile: (profile: UserProfile | null) => void
      setPromoterProfile: (profile: PromoterProfile | null) => void
      setLoading: (loading: boolean) => void
      setError: (error: string | null) => void
    }

    export type AccountStore = AccountState & AccountActions
    ```

  # 5.3. Eventos – filtros e listagens (features/events/store/eventFiltersStore.ts)
    Responsável por:
      - Estado de filtros na listagem de eventos públicos:
      - busca por título,
      - categoria,
      - cidade,
      - intervalo de datas.

    Exemplo:
    ```
    export type EventFiltersState = {
      search: string
      category: string | null
      city: string | null
      dateFrom: Date | null
      dateTo: Date | null
    }

    export type EventFiltersActions = {
      setSearch: (value: string) => void
      setCategory: (value: string | null) => void
      setCity: (value: string | null) => void
      setDateFrom: (value: Date | null) => void
      setDateTo: (value: Date | null) => void
      reset: () => void
    }

    export type EventFiltersStore = EventFiltersState & EventFiltersActions
    ```

  Uso típico:
    A página /eventos (client component) consome esse store para renderizar filtros e passar parâmetros para busca (SSR/CSR).
    Componentes de filtro usam RHF apenas para a UI; o resultado final é sincronizado com o store.


  # 5.4. Eventos – criação/edição (features/events/store/eventCreationStore.ts)
      Responsável por:
        - Estado cross-step do fluxo de cadastro de evento (wizard).
        - Consolidação de dados que vêm de múltiplos formulários (RHF).
        ```
        export type EventCreationStep = 'details' | 'tickets' | 'review'

        export type EventDraft = {
          // campos principais do evento (simplificado)
          title: string
          description?: string
          category?: string
          city?: string
          venue?: string
          date?: Date
          // lotes de ingresso
          tickets: Array<{
            id: string
            name: string
            price: number
            quantity: number
          }>
        }

        export type EventCreationState = {
          step: EventCreationStep
          draft: EventDraft
        }

        export type EventCreationActions = {
          setStep: (step: EventCreationStep) => void
          updateDraft: (partial: Partial<EventDraft>) => void
          reset: () => void
        }

        export type EventCreationStore = EventCreationState & EventCreationActions
        ```

        Regras:
        RHF continua responsável por cada formulário de step.
        No submit de cada step, sincronizar o snapshot no draft.
        reset deve limpar tudo após o evento ser criado com sucesso.

  # 5.5. Tickets (features/tickets/store/ticketsViewStore.ts)
    Responsável por:
      - Abas/segmentação de tickets do usuário: ativos, utilizados, todos.
      - Parâmetros de filtro adicionais (por evento, por cidade, etc. se necessário).
      - Estado de UI para leitura/validação básica.
      ```
      export type TicketsTab = 'active' | 'used' | 'all'

      export type TicketsViewState = {
        selectedTab: TicketsTab
      }

      export type TicketsViewActions = {
        setSelectedTab: (tab: TicketsTab) => void
      }

      export type TicketsViewStore = TicketsViewState & TicketsViewActions
      ```

    Para validação via QR Code no futuro, pode existir um ticketValidationStore separado se a lógica crescer.

  # 5.6. Pedidos / Checkout (features/orders/store/checkoutStore.ts)
    Responsável por:
      - Fluxo de checkout do ticket:
      - itens selecionados,
      - método de pagamento,
      - step atual,
      - status do processamento.
      ```
      export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card'

      export type CheckoutStep = 'review' | 'payment' | 'confirmation'

      export type CheckoutItem = {
        eventId: string
        ticketTypeId: string
        quantity: number
        unitPrice: number
      }

      export type CheckoutState = {
        items: CheckoutItem[]
        paymentMethod: PaymentMethod | null
        step: CheckoutStep
        isProcessing: boolean
        error: string | null
      }

      export type CheckoutActions = {
        setItems: (items: CheckoutItem[]) => void
        addItem: (item: CheckoutItem) => void
        removeItem: (ticketTypeId: string) => void
        clearItems: () => void
        setPaymentMethod: (method: PaymentMethod | null) => void
        setStep: (step: CheckoutStep) => void
        setProcessing: (processing: boolean) => void
        setError: (error: string | null) => void
        reset: () => void
      }

      export type CheckoutStore = CheckoutState & CheckoutActions
      ```

      Regras:
      Pode usar persist dependendo da experiência desejada (ex: recuperar carrinho se a página recarregar).
      Dados sensíveis de cartão não devem ser persistidos.

  # 5.7. Dashboard (features/dashboard/store/dashboardFiltersStore.ts)
    Responsável por:
      - Filtros aplicados no dashboard de promotor/admin:
      - intervalo de datas,
      - evento selecionado,
      - tipo de métrica (faturamento, ingressos vendidos, etc.).
      ```
      export type DashboardMetricType = 'revenue' | 'tickets' | 'conversion'

      export type DashboardFiltersState = {
        dateRange: {
          from: Date | null
          to: Date | null
        }
        eventId: string | null
        metricType: DashboardMetricType
      }

      export type DashboardFiltersActions = {
        setDateRange: (from: Date | null, to: Date | null) => void
        setEventId: (eventId: string | null) => void
        setMetricType: (type: DashboardMetricType) => void
        reset: () => void
      }

      export type DashboardFiltersStore = DashboardFiltersState & DashboardFiltersActions
      ```

  # 5.8. UI global (shared/store/uiStore.ts)
    Responsável por:
      - Snackbar global.
      - Diálogos modais genéricos.
      - Loading global opcional.
      ```
      export type SnackbarProps = {
        open: boolean
        message: string
        severity?: 'success' | 'error' | 'info' | 'warning'
      }

      export type UiState = {
        snackbar: SnackbarProps
      }

      export type UiActions = {
        showSnackbar: (payload: Omit<SnackbarProps, 'open'>) => void
        hideSnackbar: () => void
      }

      export type UiStore = UiState & UiActions
      ```

## 6. Regras para criação/alteração de state (para devs e assistentes)
  Sempre que for necessário adicionar ou modificar estado global: 
    - Identifique o domínio
    - Auth, account, events, tickets, orders/checkout, dashboard ou UI global.
    - Procure primeiro um store existente
    - Se existir (authStore, eventFiltersStore, etc.), estenda esse store em vez de criar outro com responsabilidade duplicada.
    - Se precisar de um novo store
    - Crie o arquivo em features/<domínio>/store/<nomeDescritivo>Store.ts ou em shared/store se for transversal.
    
    Siga o padrão:
      - State + Actions + Store (tipo combinado).
      - useXxxStore como nome do hook.
      - Evite antipadrões
      - Não ler useXxxStore.getState() em Server Components.
      - Não criar um único store genérico com tudo dentro.
      - Não duplicar estado entre Zustand e RHF sem necessidade.
      - Integração com formulários
      - Use RHF + Zod como fonte da verdade do formulário.
      - Use o store para guardar apenas conclusões (ex: EventDraft, CheckoutState), quando precisar persistir     entre steps ou telas

    Seguindo este guia, qualquer desenvolvedor ou assistente (como o Codex) deve conseguir:
      - Descobrir rapidamente onde colocar novo estado.
      - Entender quem é dono de quê.
      - Evoluir o projeto sem criar bolos de estado difíceis de manter.