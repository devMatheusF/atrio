# UI

## 1. Visão geral

A interface da aplicação é construída com:

- **Next App Router** (páginas em `/app`).
- **React + MUI** como base visual.
- **Tema customizado em `/app/theme`**, com tokens de cor, espaçamento, radius e sombras.
- Fontes definidas via `next/font` em `app/layout.tsx` (Geist) e tipografia adicional em `theme/typography.ts`.

Objetivos de UI/UX:

- Layout **limpo, claro e legível**, com forte contraste de texto.
- **Foco em conteúdo e ações principais** (descobrir, criar e comprar eventos).
- Visual que comunica **calma, confiança e espiritualidade** (tons de azul e dourado, fundos suaves).

---

## 2. Tema e tokens

O tema da aplicação é definido em `/app/theme/index.ts`, utilizando os tokens de:

- `/app/theme/tokens/colors.ts`
- `/app/theme/tokens/radius.ts`
- `/app/theme/tokens/shadows.ts`
- `/app/theme/tokens/spacing.ts`
- `/app/theme/tokens/typography.ts`

### 2.1. Cores

Os tokens de cor estão em `theme/tokens/colors.ts`:

```ts
export const colors = {
  primary: {
    900: '#050A1A',
    700: '#0F1F3C',
    500: '#182D59',
    300: '#3A5891',
    100: '#E0E6F4',
  },
  secondary: {
    900: '#5C3B05',
    700: '#8A5A0A',
    500: '#C89A32',
    300: '#E5C46A',
    100: '#FFF4D9',
  },
  neutral: {
    900: '#111111',
    700: '#4A4A4A',
    500: '#9E9E9E',
    300: '#D6D6D6',
    100: '#F5F5F7',
    0: '#FFFFFF',
  },
  background: {
    default: '#F5F5F7',
    surface: '#FFFFFF',
  },
  text: {
    primary: '#111111',
    secondary: '#4A4A4A',
    muted: '#9E9E9E',
    onPrimary: '#FFFFFF',
    onSecondary: '#1C1302',
  },
  feedback: {
    success: '#2E7D32',
    error: '#C62828',
    warning: '#ED6C02',
    info: '#0288D1',
  },
};
```

Padrões de uso:

Plano de fundo da aplicação:
colors.background.default – usado na home em app/page.tsx.

Superfícies (cards, caixas de conteúdo):
colors.background.surface ou colors.neutral[0] (branco).

Texto:
Principal → colors.text.primary
Secundário / descrições → colors.text.secondary
Texto “apagado” / estados vazios → colors.text.muted

Ações principais (CTA):
Uso de primary.500 e primary.700 para botões e elementos interativos.
Realces / detalhes “dourados”:
secondary.500 / secondary.300 para detalhes, badges e acentos de fé/celebração.

Feedback:
sucesso → feedback.success
erro → feedback.error
aviso → feedback.warning
informação → feedback.info

Assistentes (Codex): ao criar componentes novos, utilizar esses tokens via theme.palette ou importando colors de ./theme/tokens/colors quando apropriado.

### 2.2. Radius (bordas arredondadas)

Definido em theme/tokens/radius.ts:
```
export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
};
```

Padrões de uso:
radius.sm → pequenos elementos (chips, tags, inputs simples).
radius.md → cards padrão, blocos de conteúdo, modais.
radius.lg → seções principais, cards de destaque, hero widgets.
radius.pill → botões pill, badges arredondadas, elementos “capsule”.
Sempre que criar um Card/Box que represente uma superfície, usar algum desses tokens em borderRadius.

### 2.3. Sombras

Definidas em theme/tokens/shadows.ts:
```
import { colors } from './colors';

export const shadows = {
  card: '0 8px 24px rgba(0, 0, 0, 0.05)',
  focus: `0 0 0 3px ${colors.primary[100]}`,
  mui: [
    'none',
    '0px 1px 3px rgba(0,0,0,0.12)',
    '0px 4px 10px rgba(0,0,0,0.10)',
    '0px 8px 24px rgba(0,0,0,0.08)',
  ],
};
```

Padrões de uso:
shadows.card → superfície card principal (eventos, widgets, seções em destaque).
shadows.focus → estados de foco customizados (ex: ao redor de card clicável, inputs destacados).
shadows.mui[...] → mapeadas para theme.shadows do MUI.

### 2.4. Espaçamento
Definido em theme/tokens/spacing.ts:
```
export const spacing = {
  unit: 4,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
};
```

Padrões de uso (guideline):
Espaçamento vertical entre seções: lg (24) ou xl (32).
Padding interno de cards/seções: md (16) ou lg (24).
Margens pequenas entre elementos relacionados (label/input, ícone/texto): sm (8).

Como aplicar:
Via sx do MUI:
```
<Box sx={{ p: spacing.lg }}>
```
Ou via API theme.spacing se o tema estiver configurado com spacing.unit.

Assistentes (Codex): preferir usar tokens (spacing.xs/sm/md/lg/xl) para manter consistência, em vez de números mágicos.

### 2.5. Tipografia
Tokens em theme/tokens/typography.ts:
```
export const typography = {
  fontFamily: {
    base: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};
```

A fonte efetiva vem das variáveis do Geist em app/layout.tsx:
```
const geistSans = Geist({ variable: "--font-geist-sans", ... });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", ... });

<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
```

Regras:
Sempre usar <Typography> do MUI em vez de h1/h2/p direto, exceto em casos muito simples.
Variantes recomendadas:
h3 / h4 → títulos de página/seção.
h5 / h6 → cards e subtítulos.
body1 → textos principais.
body2 → descrições e textos auxiliares.
caption → rótulos menores, estados vazios, micro textos.

# 3. Layout de página
### 3.1. Layout raiz
app/layout.tsx define:
ThemeProvider (MUI) com theme global.
CssBaseline para reset.
fontes via Geist (next/font).
Todas as páginas devem assumir:
Uma hierarquia simples: body → ThemeProvider → page content.
Que o fundo base é controlado pelo componente da página (Box com bgcolor).

### 3.2. Home como referência
```
app/page.tsx:

"use client";

import { Box } from "@mui/material";
import { colors } from "./theme/tokens/colors";
import {
  Collections,
  CreateEventWidget,
  FAQSection,
  Header,
  Hero,
  MostPurchasedEvents,
  TodaysEvents,
} from "./components/home";

export default function Home() {
  return (
    <Box sx={{ bgcolor: colors.background.default, pb: 8 }}>
      <Header />
      <Hero />
      <Collections />
      <MostPurchasedEvents />
      <TodaysEvents />
      <CreateEventWidget />
      <FAQSection />
    </Box>
  );
}
```

Padrões a seguir em outras páginas:
Usar um container raiz com bgcolor: colors.background.default.
Garantir padding inferior (pb) suficiente para não “colar” no fim da tela.
Compor a página por seções verticais (Header, Hero, Lists, Widgets, etc.).
Assistentes (Codex): ao criar novas páginas, seguir a mesma ideia de “stack de seções” com um Box raiz de fundo.

# 4. Superfícies (cards, seções e containers)
### 4.1. Cards padrão
Superfícies principais (cards de evento, widgets, blocos de conteúdo) devem seguir:
bgcolor: colors.background.surface ou colors.neutral[0].
borderRadius: radius.lg ou radius.md.
boxShadow: shadows.card.
p: spacing.md ou spacing.lg.

Exemplo:
```
import { Box } from "@mui/material";
import { colors } from "@/app/theme/tokens/colors";
import { radius } from "@/app/theme/tokens/radius";
import { shadows } from "@/app/theme/tokens/shadows";
import { spacing } from "@/app/theme/tokens/spacing";

export function CardSurface({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        bgcolor: colors.background.surface,
        borderRadius: radius.lg,
        boxShadow: shadows.card,
        p: spacing.lg,
      }}
    >
      {children}
    </Box>
  );
}
```

Assistentes (Codex): ao criar novos widgets ou formulários, envolver o conteúdo principal em uma superfície semelhante.

# 5. Botões e CTAs
Padrões:
Botão principal de ação → variant="contained" color="primary".
Ações secundárias → variant="outlined" ou text com color="primary" ou neutros.

UX:
CTAs principais claros e destacados (normalmente um por seção).
Em formulários, botão de submit posicionado à direita ou centralizado na base.

# 6. Formulários – UI/UX
A lógica de RHF + Zod está detalhada em docs/forms.md.
Aqui tratamos apenas de layout e experiência visual.

### 6.1. Layout base de formulário
Um formulário típico deve:
Ser envolvido por uma superfície (CardSurface ou Box com fundo surface).
Ter espaçamento interno confortável (16–24 px).
Organizar campos com o Grid do MUI (quando houver múltiplas colunas).

Exemplo canônico:
```
import { Box, Grid, Typography, Button } from "@mui/material";
import { colors } from "@/app/theme/tokens/colors";
import { radius } from "@/app/theme/tokens/radius";
import { shadows } from "@/app/theme/tokens/shadows";
import { spacing } from "@/app/theme/tokens/spacing";

export function FormContainer({ title, description, children, onSubmit }: {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit: React.FormEventHandler;
}) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        bgcolor: colors.background.surface,
        borderRadius: radius.lg,
        boxShadow: shadows.card,
        p: spacing.lg,
      }}
    >
      <Typography variant="h5" sx={{ mb: spacing.sm, color: colors.text.primary }}>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ mb: spacing.md, color: colors.text.secondary }}>
          {description}
        </Typography>
      )}

      <Grid container spacing={3}>
        {children}
      </Grid>

      <Box sx={{ mt: spacing.lg, display: "flex", justifyContent: "flex-end", gap: spacing.sm }}>
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
```

### 6.2. Campo de formulário padrão (MUI + RHF)
Para cada campo:
Usar TextField MUI (ou equivalente) como base.
Exibir label claro, helper text quando necessário, e mensagem de erro vinda do RHF.
Manter largura total (fullWidth) por padrão em telas menores.

Exemplo (sem lógica de RHF, apenas UI):
```
<Grid item xs={12} md={6}>
  <TextField
    fullWidth
    label="Título do evento"
    placeholder="Ex.: Conferência Jovem 2025"
  />
</Grid>
```

Assistentes (Codex): ao criar os campos reais com RHF, envolver o TextField em um Controller e mapear error / helperText conforme o schema Zod.

### 6.3. UX de formulário
Regras gerais:
Exibir estados de erro próximo ao campo, nunca apenas em um toast global.
Desabilitar o botão de submit enquanto estiver processando (loading).

Após sucesso:
Opcionalmente, mostrar um snackbar de sucesso usando o store de UI global.
Resetar o formulário ou redirecionar conforme o fluxo.

# 7. Padrões específicos para assistentes (Codex)
Quando um assistente (ex.: Codex) for criar uma nova tela ou formulário, deve seguir estas regras:
Páginas:
Usar um Box raiz com:
bgcolor: colors.background.default
espaçamento inferior adequado (pb).
Compor a página por seções (Header, conteúdo, etc.) em componentes separados, como na Home.

Formulários
Criar um componente FormContainer ou estrutura equivalente:
Box ou Card com bgcolor: colors.background.surface.
borderRadius: radius.lg (ou md).
boxShadow: shadows.card.
p: spacing.lg.
Organizar os campos em Grid container spacing={3} com Grid item xs={12} md={6} para campos padrão.

Campos:
Utilizar TextField, Select, Checkbox, Radio etc. do MUI.
fullWidth por padrão.
Label e placeholder coerentes, em português claro.
Integrar com RHF + Zod conforme docs/forms.md.

Cores:
Plano de fundo da página → colors.background.default.
Superfícies → colors.background.surface / colors.neutral[0].
Títulos → colors.text.primary.
Descrições → colors.text.secondary.
CTAs → variant="contained" color="primary" (mapeado para colors.primary[500] no tema).

Radius e sombras:
Usar radius.lg ou md para cards / formulários.
Usar shadows.card para superfícies destacadas.

Spacing:
Usar spacing.md/lg como p de superfícies.
Usar spacing.sm/md como mb entre texto e campos.
Evitar números soltos (mb: 3) sem necessidade; preferir tokens (spacing.*).

# 8. Exemplos de uso
### 8.1. Exemplo simples de seção de página
```
import { Box, Typography } from "@mui/material";
import { colors } from "@/app/theme/tokens/colors";
import { spacing } from "@/app/theme/tokens/spacing";

export function SectionIntro() {
  return (
    <Box sx={{ py: spacing.xl }}>
      <Typography variant="h4" sx={{ color: colors.text.primary, mb: spacing.sm }}>
        Próximos eventos
      </Typography>
      <Typography variant="body1" sx={{ color: colors.text.secondary }}>
        Encontre encontros cristãos perto de você e viva experiências de fé.
      </Typography>
    </Box>
  );
}
```
### 8.2. Exemplo simplificado de formulário aplicando o padrão de UI
```
"use client";

import { Grid, TextField } from "@mui/material";
import { FormContainer } from "@/app/components/FormContainer"; // conforme exemplo deste documento

export function CreateEventFormUIOnly() {
  return (
    <FormContainer
      title="Criar evento"
      description="Preencha as informações básicas do seu evento cristão."
      onSubmit={(e) => e.preventDefault()}
    >
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Título do evento"
          placeholder="Ex.: Conferência Jovem 2025"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Cidade"
          placeholder="Ex.: Belo Horizonte"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="date"
          label="Data"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Descrição"
          placeholder="Conte um pouco sobre o propósito do evento."
        />
      </Grid>
    </FormContainer>
  );
}
```