# Forms

## 1. Visão geral

A aplicação utiliza **React Hook Form + Zod + MUI** como padrão único para formulários.

Objetivos:

- Ter um **único “dono” do estado do formulário** (React Hook Form).
- Usar **Zod** como fonte de verdade da validação.
- Usar **MUI** como base visual, seguindo os padrões definidos em `docs/ui.md`.
- Evitar duplicação de estado em Zustand (ver detalhes em `docs/state.md`).

Sempre que um formulário for criado ou alterado, estas regras devem ser seguidas.

---

## 2. Onde ficam formulários, schemas e tipos

### 2.1. Componentes de formulário

Por padrão:

- Páginas do Next App Router ficam em `app/<rota>/page.tsx`.
- Componentes de página (incluindo formulários) ficam em `app/components/`.
- Componentes de formulário reutilizáveis podem ser organizados em:
  - `app/components/forms/<NomeDoForm>.tsx`, ou
  - `app/shared/components/forms/<NomeDoForm>.tsx` se forem realmente compartilhados entre páginas.

**Regra prática:**

- Se o formulário é específico de uma página, coloque o componente em `app/components/<Feature>/<NomeDoForm>.tsx`.
- Se for genérico (ex.: um `TextField` já integrado com RHF), coloque em `app/shared/components`.

### 2.2. Schemas Zod

Schemas de validação devem ficar em:

- `app/shared/validation/<dominio>/<NomeDoSchema>.ts`

Exemplos:

- `app/shared/validation/events/createEventSchema.ts`
- `app/shared/validation/auth/loginSchema.ts`

### 2.3. Tipagens

Tipos derivados de Zod e tipos auxiliares:

- Em regra, tipos derivados **diretamente** dos schemas Zod podem ficar no mesmo arquivo do schema.
- Tipos mais amplos, compartilhados entre services e componentes, podem ir para:
  - `app/shared/types/<dominio>.ts`

---

## 3. Princípios gerais de formulários

1. **React Hook Form é o dono do estado**
   - Não duplica o estado campo a campo em Zustand.
   - Pode, quando necessário, salvar um **snapshot consolidado** (ex.: `EventDraft`) em uma store (ver `docs/state.md`).

2. **Zod é a fonte de verdade para validação**
   - Todo formulário relevante deve ter um schema Zod correspondente.
   - Não reimplementar validação “na mão” em cada campo.

3. **MUI fornece a UI**
   - Campos visuais devem sempre ser MUI (`TextField`, `Select`, `Checkbox`, etc.).
   - Layout de formulário deve seguir `FormContainer` / padrão de `docs/ui.md`.

4. **Componentes client**
   - Todo componente de formulário deve ser um Client Component:
     - Incluir `"use client"` no topo do arquivo.

---

## 4. Fluxo padrão de um formulário

O fluxo padrão para criar um formulário é:

1. Criar o **schema Zod** em `app/shared/validation/...`.
2. Inferir o tipo do formulário a partir do schema (`z.infer`).
3. Definir `defaultValues` consistentes com o schema.
4. Implementar o componente de formulário:
   - `"use client"`.
   - `useForm` + `zodResolver`.
   - Uso de `FormContainer` (ou layout equivalente descrito em `docs/ui.md`).
   - Campos integrados via `Controller` quando necessário.
5. Integrar com serviços em `app/services/<dominio>` (submit).

---

## 5. Exemplo completo – Formulário de criação de evento

### 5.1. Schema Zod

**Arquivo:** `app/shared/validation/events/createEventSchema.ts`

```ts
import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres.")
    .max(120, "O título pode ter no máximo 120 caracteres."),
  city: z
    .string()
    .min(2, "Informe a cidade do evento.")
    .max(80, "A cidade pode ter no máximo 80 caracteres."),
  date: z
    .string()
    .nonempty("Informe a data do evento."),
  description: z
    .string()
    .max(1000, "A descrição pode ter no máximo 1000 caracteres.")
    .optional(),
});

export type CreateEventFormValues = z.infer<typeof createEventSchema>;
```
### 5.2. Componente de formulário (UI + RHF + Zod + MUI)

Arquivo (exemplo): app/components/events/CreateEventForm.tsx

```ts
"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, TextField, CircularProgress } from "@mui/material";

import { createEventSchema, CreateEventFormValues } from "@/app/shared/validation/events/createEventSchema";
import { FormContainer } from "@/app/components/FormContainer";
import { spacing } from "@/app/theme/tokens/spacing";
import { colors } from "@/app/theme/tokens/colors";
// import { useUiStore } from "@/app/store/uiStore"; // se existir para snackbar
// import { createEvent } from "@/app/services/events"; // exemplo de service

type CreateEventFormProps = {
  onSuccess?: () => void;
};

export function CreateEventForm({ onSuccess }: CreateEventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const showSnackbar = useUiStore((s) => s.showSnackbar);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      city: "",
      date: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateEventFormValues) => {
    try {
      setIsSubmitting(true);

      // TODO: integrar service real
      // await createEvent(data);

      // showSnackbar({
      //   message: "Evento criado com sucesso!",
      //   severity: "success",
      // });

      reset();
      onSuccess?.();
    } catch (error) {
      // showSnackbar({
      //   message: "Não foi possível criar o evento. Tente novamente.",
      //   severity: "error",
      // });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer
      title="Criar evento"
      description="Preencha as informações básicas do seu evento cristão."
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={12} md={6}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Título do evento"
              placeholder="Ex.: Conferência Jovem 2025"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Cidade"
              placeholder="Ex.: Belo Horizonte"
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="date"
              label="Data"
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              minRows={3}
              label="Descrição"
              placeholder="Conte um pouco sobre o propósito do evento."
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
      </Grid>

      {/* Botão de submit: override leve do FormContainer se quiser mostrar loading */}
      {/* Exemplo: se quiser mais controle, pode passar isSubmitting via props ou repensar o FormContainer */}
    </FormContainer>
  );
}
```
Observação: o FormContainer aqui é o padrão visual descrito em docs/ui.md.
Se o FormContainer ainda não existir, ele deve ser criado seguindo exatamente o layout recomendado em docs/ui.md.


# 6. Padrões de campos
### 6.1. TextField (string)
Usar Controller sempre que o campo precisar de integração total com RHF.
Enviar error e helperText a partir de formState.errors.

```ts
<Controller
  name="title"
  control={control}
  render={({ field }) => (
    <TextField
      {...field}
      fullWidth
      label="Título"
      error={!!errors.title}
      helperText={errors.title?.message}
    />
  )}
/>
```

### 6.2. Select (opções)
```
import { MenuItem, TextField } from "@mui/material";

<Controller
  name="category"
  control={control}
  render={({ field }) => (
    <TextField
      {...field}
      select
      fullWidth
      label="Categoria"
      error={!!errors.category}
      helperText={errors.category?.message}
    >
      <MenuItem value="conference">Conferência</MenuItem>
      <MenuItem value="worship">Culto de adoração</MenuItem>
      <MenuItem value="youth">Encontro de jovens</MenuItem>
    </TextField>
  )}
/>
```

### 6.3. Checkbox / Switch
```
import { FormControlLabel, Checkbox } from "@mui/material";

<Controller
  name="isPublic"
  control={control}
  render={({ field }) => (
    <FormControlLabel
      control={<Checkbox {...field} checked={field.value} />}
      label="Evento público"
    />
  )}
/>
```

### 6.4. Campos de data/hora
Por padrão:
Usar type="date" ou componentes MUI específicos (quando configurados).
Armazenar em string no schema se ainda não houver decisão de DTO com Date.

# 7. Integração com Zustand e serviços
### 7.1. Zustand
Conforme docs/state.md:
Não espelhar campos individuais em Zustand.
Se necessário, salvar um snapshot consolidado ao fim de cada step/form.
Exemplo (wizard de criação de evento):
Store: useEventCreationStore em app/store/eventCreationStore.ts (ou conforme docs/state.md atual).

No onSubmit de um step:
const updateDraft = useEventCreationStore((s) => s.updateDraft);
const onSubmit = (values: CreateEventFormValues) => {
  updateDraft(values);
  goToNextStep();
};

### 7.2. Serviços
Services devem ficar em app/services/<dominio>/index.ts (como descrito no AGENTS.md).
O formulário chama o service e lida com erros de forma amigável.

```
// app/services/events/index.ts
export async function createEvent(payload: CreateEventFormValues) {
  // chamada HTTP/Prisma/etc.
}

const onSubmit = async (data: CreateEventFormValues) => {
  try {
    setIsSubmitting(true);
    await createEvent(data);
    // showSnackbar sucesso
  } catch (error) {
    // showSnackbar erro
  } finally {
    setIsSubmitting(false);
  }
};
```

# 8. Regras específicas para assistentes (Codex)
Sempre que for criar ou alterar um formulário:
Leia antes:
docs/ui.md (layout e padrão visual),
docs/state.md (como interagir com Zustand, se necessário),
docs/architecture.md (onde ficam páginas e componentes).

Localização de arquivos:
Schema Zod → app/shared/validation/<dominio>/<NomeSchema>.ts.
Formulário → app/components/<dominio>/<NomeForm>.tsx ou app/shared/components/forms se for genérico.

Padrão de implementação:
"use client" no topo do arquivo.
useForm com zodResolver(schema).
defaultValues completos.
UI baseada no FormContainer ou layout descrito em docs/ui.md.
Campos integrados via Controller + componentes MUI.
Exibir error e helperText de formState.errors.

UX:
Desabilitar botão de submit quando isSubmitting estiver true.
Exibir feedback de sucesso/erro (preferencialmente via store de UI/snakbar).
Focar no campo com erro principal, quando fizer sentido.

Estado global:
Apenas salvar em Zustand o que for necessário para outros componentes/telas (ex.: drafts, filtros, dados consolidados).
Nunca replicar todos os campos do formulário campo a campo em stores, exceto se estiver explicitamente descrito em docs/state.md.
Seguindo este guia, qualquer desenvolvedor ou assistente (como o Codex CLI) deve ser capaz de criar novos formulários completos — com RHF + Zod + MUI + tokens visuais + integração com services — apenas com instruções de alto nível, como:
“Crie um formulário de criação de evento com campos: título, cidade, data e descrição, seguindo docs/forms.md e docs/ui.md.”