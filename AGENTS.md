# AGENTS
Você é um engenheiro de software especialista trabalhando neste projeto React + TypeScript.
Stack principal:
- UI: MUI
- Estado global: Zustand
- Formulários: React Hook Form + Zod
- Roteamento: Next (App Router)

## Arquitetura

- Componentes de cada página em `app/components/`.
- Componentes compartilhados em `app/shared/components`.
- Hooks compartilhados em `app/shared/hooks`.
- Stores Zustand em `app/store`.
- Schemas de validação em `app/shared/validation`.
- Os temas e tokens para compor o storybook em `app/theme`
- Libs internas compartilhadas em `app/lib`
- Serviços que tratam os dados capturados através do prisma em `app/services`
- Tipagens compartilhadas em `app/shared/types`
- Novas páginas em `app`
    Para páginas que possuem index e show (listagem completa e listagem única) utilize o padrao do app router


## Convenções

- Sempre use componentes MUI para layout básico (Grid, Box, Typography, Button, Accordion).
- Em formulários, **sempre** use React Hook Form com `Controller` quando integrar com MUI.
- Quando houver estado cross-component, prefira Zustand a prop drilling.
- Escreva os componentes em TypeScript com function components e hooks.
- Utilize o TypeScript de maneira plena, tipando todos os dados.

## Regras para você (Codex)

1. Antes de implementar algo novo, procure e leia (se existirem):
   - `docs/architecture.md`
   - `docs/product.md`
   - `docs/ui.md`
   - `docs/form.md`
   - `docs/state.md`
   - `docs/agents/front.md` quando a tarefa envolver UI, componentes, páginas, estilos, design system, Storybook ou qualquer implementação visual
   - Consulte também os MCPs configurados no projeto conforme o tipo de tarefa, priorizando sempre fontes oficiais e contextuais antes de assumir APIs, props ou comportamentos

2. Processo de desenvolvimento guiado por especificação:
   - Antes de codar, leia a especificação funcional e técnica relacionada à tarefa.
   - Se a demanda envolver interface, comportamento visual ou componentes, consulte também `docs/agents/front.md`.
   - Não assuma regras de componentes ou propriedades visualmente "prováveis"; valide primeiro na documentação e nas referências do projeto.
   - Quando uma especificação estiver desatualizada em relação ao código solicitado, atualize a documentação correspondente durante a implementação.

3. Ao criar uma nova página:
   - Criar pasta em `app/<nome>`.
   - Criar pelo menos:
     - `<Nome>Page.tsx`
     - `components/<Nome>Form.tsx` (se for formulário)
     - `store/<nome>Store.ts` (se precisar de Zustand)
     - `services/<nome>/index.ts`
     - `servicesImpl/<nome>/index.ts`
   - Adicionar testes básicos se existir `tests/` ou `*.spec.tsx` no projeto.

4. Em formulários:
   - Utilizar `useForm` de React Hook Form.
   - Integrar com MUI usando `Controller`.
   - Validar com Zod (se já estiver no projeto) seguindo os exemplos em `docs/form.md`.

5. Na pasta lib:
   - Criar helpers sempre que alguma lógica puder ser utilizada em mais de um componente ou serviço
     - `lib/helpers/<nome>`
     - `lib/<nome>` (Para códigos que terao muita complexidade e serao completamente agnósticos e geralmente por classe, por ex, uma classe http que extrai todos os verbos get, put, patch, post, delete).

6. Em implementações de frontend:
   - Consulte `docs/agents/front.md` antes de alterar componentes, páginas ou stories.
   - Nunca invente props de componentes do design system.
   - Valide sempre a API real dos componentes e siga as convenções documentadas para Storybook e testes visuais.
   - Para componentes próprios e stories, o uso do MCP do Storybook é obrigatório quando ele estiver disponível.
   - Para componentes do MUI, o uso do MCP oficial do MUI é obrigatório antes de utilizar props, variantes, slots ou padrões menos comuns.
   - Em dúvidas sobre renderização, rotas, erros de runtime, metadata de páginas ou comportamento do App Router, o uso do MCP do Next.js é obrigatório quando ele estiver disponível.
   - Para validar comportamento no navegador, formulários, fluxos e regressões visuais/funcionais, use o MCP do Playwright como padrão quando ele estiver disponível, com o menor conjunto de capacidades necessário.
   - Sempre prefira a menor fonte suficiente de contexto:
     - Storybook MCP para componentes internos
     - MUI MCP para API do design system
     - Next MCP para runtime e estrutura do app
     - Playwright MCP para verificação executando a interface real

7. Uso operacional dos MCPs:
   - Quando precisar do Storybook MCP, garanta que o Storybook esteja em execução com `npm run storybook`.
   - Quando precisar do Next MCP, garanta que a aplicação esteja em execução com `npm run dev`.
   - Quando um MCP aplicável estiver disponível, ele deve ser consultado antes de responder com base em memória.
   - Evite abrir documentação ampla no chat quando o MCP puder responder de forma mais específica e com menos tokens.
   - Se a resposta puder ser obtida pelo código local ou por um MCP específico, não faça inferências a partir de memória.

8. Sempre que alterar código existente:
   - Manter estilo de código, padrões e nomes.
   - Rodar os testes existentes relacionados (quando eu aprovar comando).
