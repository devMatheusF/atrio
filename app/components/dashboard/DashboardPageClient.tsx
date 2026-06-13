"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Fab,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { useDashboardStore, type DashboardState } from "@/app/store/dashboardStore";
import { colors } from "@/app/theme/tokens/colors";
import { radius } from "@/app/theme/tokens/radius";
import { shadows } from "@/app/theme/tokens/shadows";
import { spacing } from "@/app/theme/tokens/spacing";

type DashboardPageClientProps = {
  initialState: DashboardState;
};

function formatCurrencyBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function DashboardCurrency({ value }: { value: number }) {
  const [formatted, setFormatted] = useState<string>("");
  useEffect(() => {
    setFormatted(formatCurrencyBRL(value));
  }, [value]);
  return <>{formatted}</>;
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        py: spacing.xl,
        px: spacing.md,
        gap: spacing.sm,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          width: 56,
          height: 56,
          borderRadius: radius.pill,
          display: "grid",
          placeItems: "center",
          bgcolor: colors.background.default,
          border: `1px solid ${colors.neutral[300]}`,
          color: colors.text.secondary,
        }}
      >
        <PaymentsOutlinedIcon />
      </Box>
      <Box sx={{ display: "grid", gap: 0.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.text.secondary, maxWidth: 520 }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

function MetricCard({
  title,
  value,
  helperText,
  icon,
}: {
  title: string;
  value: React.ReactNode;
  helperText: string;
  icon: React.ReactNode;
}) {
  return (
    <Box
      component="section"
      aria-label={title}
      sx={{
        bgcolor: colors.background.surface,
        border: `1px solid ${colors.neutral[300]}`,
        borderRadius: radius.lg,        
        p: spacing.xs,
        display: "flex",
        flexDirection: "column",
        gap: 0.75,
        '&:hover': {
          boxShadow: shadows.card,
          cursor: 'pointer'
        }
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" sx={{ color: colors.text.secondary, fontWeight: 700 }}>
          {title}
        </Typography>
        <Box aria-hidden="true" sx={{ color: colors.text.secondary }}>
          {icon}
        </Box>
      </Stack>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
        {helperText}
      </Typography>
    </Box>
  );
}

export function DashboardPageClient({ initialState }: DashboardPageClientProps) {
  const hydratedRef = useRef(false);
  const hydrateFromServer = useDashboardStore((s) => s.hydrateFromServer);
  const state = useDashboardStore((s) => s.state);
  const setFilters = useDashboardStore((s) => s.setFilters);

  const [chartMode, setChartMode] = useState<"both" | "sales" | "quantity">("both");

  useEffect(() => {
    if (hydratedRef.current) return;
    hydrateFromServer(initialState);
    hydratedRef.current = true;
  }, [hydrateFromServer, initialState]);

  const metricsCards = useMemo(() => {
    const helper = "Nenhuma venda registrada no período selecionado";
    return [
      {
        title: "Vendas Líquidas",
        value: <DashboardCurrency value={state.metrics.netSales} />,
        helperText: helper,
        icon: <PaymentsOutlinedIcon fontSize="small" />,
      },
      {
        title: "Ingressos Aprovados",
        value: String(state.metrics.approvedTickets),
        helperText: `${state.metrics.freeTickets} gratuitos e ${state.metrics.paidTickets} pagos`,
        icon: <ConfirmationNumberOutlinedIcon fontSize="small" />,
      },
      {
        title: "Ticket Médio",
        value: <DashboardCurrency value={state.metrics.averageTicket} />,
        helperText: helper,
        icon: <PaymentsOutlinedIcon fontSize="small" />,
      },
    ];
  }, [state.metrics]);

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
        <Box
          component="header"
          sx={{
            display: "flex",
            gap: spacing.sm,
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "flex-start" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
              {state.eventTitle}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary, mt: 0.5 }}>
              {state.eventDateRange} • {state.eventLocation}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Button variant="outlined" startIcon={<EditOutlinedIcon />} sx={{ borderRadius: radius.pill }}>
              Editar evento
            </Button>            
            <Button
              variant="outlined"
              startIcon={<DeleteOutlineOutlinedIcon />}
              sx={{ borderRadius: radius.pill, color: colors.feedback.error, borderColor: colors.error[500] }}
            >
              Apagar
            </Button>
          </Stack>
        </Box>

        <Box
          component="section"
          aria-label="Filtros e ações"
          sx={{
            display: "flex",
            gap: spacing.md,
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Stack direction="row" spacing={4} flexWrap="wrap">
            <Button
              variant="outlined"
              startIcon={<CalendarMonthOutlinedIcon />}
              onClick={() => setFilters({ period: "last_30_days" })}
              sx={{ borderRadius: radius.pill }}
            >
              Período: Últimos 30 dias <Chip label="Padrão" size="small" sx={{ ml: 1 }} />
            </Button>
            <Button
              variant="outlined"
              startIcon={<ConfirmationNumberOutlinedIcon />}
              onClick={() => setFilters({ ticketsType: "all" })}
              sx={{ borderRadius: radius.pill }}
            >
              Ingressos: Todos os tipos
            </Button>
          </Stack>

          <Button variant="contained" startIcon={<PictureAsPdfOutlinedIcon />} sx={{ borderRadius: radius.pill }}>
            Baixar PDF
          </Button>
        </Box>

        <Box
          component="section"
          aria-label="Resumo"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: spacing.md,
          }}
        >
          {metricsCards.map((card) => (
            <MetricCard key={card.title} {...card} />
          ))}
        </Box>        

        <Box
          component="section"
          aria-label="Evolução de vendas e ingressos"
          sx={{
            bgcolor: colors.background.surface,
            border: `1px solid ${colors.neutral[300]}`,
            borderRadius: radius.lg,
            boxShadow: shadows.card,
            p: spacing.sm,
            display: "flex",
            flexDirection: "column",
            gap: spacing.xs,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            spacing={2}            
          >
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Evolução de vendas e ingressos
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={chartMode}
              onChange={(_, value) => value && setChartMode(value)}
              aria-label="Modo do gráfico"
              size="small"
            >
              <ToggleButton value="both" aria-label="Ambos">
                Ambos
              </ToggleButton>
              <ToggleButton value="sales" aria-label="Vendas">
                Vendas
              </ToggleButton>
              <ToggleButton value="quantity" aria-label="Quantidade">
                Quantidade
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Divider />
          {state.salesSeries.length === 0 ? (
            <EmptyState
              title="Nenhum dado de vendas ainda"
              description="Quando as vendas começarem, você verá a evolução aqui."
            />
          ) : (
            <Box sx={{ height: 280, display: "grid", placeItems: "center", color: colors.text.secondary }}>
              Chart placeholder
            </Box>
          )}
        </Box>

        <Box
          component="section"
          aria-label="Atualização"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: spacing.md,
          }}
        >
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            Última atualização: <Box component="span" sx={{ fontWeight: 800, color: colors.text.primary }}>{state.lastUpdatedAt}</Box>
          </Typography>
          <Button variant="outlined" startIcon={<RefreshOutlinedIcon />} onClick={() => console.log("refresh")}>
            Atualizar agora
          </Button>
        </Box>

        <Tooltip title="Olá. Precisa de ajuda?">
          <Fab
            color="primary"
            aria-label="Abrir ajuda"
            sx={{
              position: "fixed",
              right: spacing.lg,
              bottom: spacing.lg,
              boxShadow: shadows.card,
            }}
          >
            <ChatBubbleOutlineOutlinedIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Container>
  );
}
