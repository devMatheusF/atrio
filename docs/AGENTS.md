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
   - `docs/ui.md`
   - `docs/forms.md`
   - `docs/state.md`

2. Ao criar uma nova página:
   - Criar pasta em `app/<nome>`.
   - Criar pelo menos:
     - `<Nome>Page.tsx`
     - `components/<Nome>Form.tsx` (se for formulário)
     - `store/<nome>Store.ts` (se precisar de Zustand)
     - `services/<nome>/index.ts`
     - `servicesImpl/<nome>/index.ts`
   - Adicionar testes básicos se existir `tests/` ou `*.spec.tsx` no projeto.

3. Em formulários:
   - Utilizar `useForm` de React Hook Form.
   - Integrar com MUI usando `Controller`.
   - Validar com Zod (se já estiver no projeto) seguindo os exemplos em `docs/forms.md`.

4. Na pasta lib:
   - Criar helpers sempre que alguma lógica puder ser utilizada em mais de um componente ou serviço
     - `lib/helpers/<nome>`
     - `lib/<nome>` (Para códigos que terao muita complexidade e serao completamente agnósticos e geralmente por classe, por ex, uma classe http que extrai todos os verbos get, put, patch, post, delete).

5. Sempre que alterar código existente:
   - Manter estilo de código, padrões e nomes.
   - Rodar os testes existentes relacionados (quando eu aprovar comando).
