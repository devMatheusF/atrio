"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

import { Session } from "@/app/shared/components/Session";
import { colors } from "@/app/theme/tokens/colors";
import { spacing } from "@/app/theme/tokens/spacing";

export default function MeusEventosDetalhePage() {
  const params = useParams<{ id: string }>();
  const eventId = params?.id;

  return (
    <Box
      sx={{
        bgcolor: colors.background.default,
        minHeight: "100vh",
        pb: `${spacing.xl}px`,
      }}
    >
      <Container sx={{ py: `${spacing.xl}px` }}>
        <Stack sx={{ gap: `${spacing.lg}px` }}>
          <Stack sx={{ gap: `${spacing.sm}px` }}>
            <Typography variant="h4" sx={{ color: colors.text.primary }}>
              Detalhes do evento
            </Typography>
            <Typography variant="body1" sx={{ color: colors.text.secondary }}>
              Visualize informações e gerencie vendas, ingressos e divulgação.
            </Typography>
          </Stack>

          <Session>
            <Typography variant="h6" sx={{ color: colors.text.primary, mb: `${spacing.xs}px` }}>
              Evento
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary, mb: `${spacing.sm}px` }}>
              {eventId ? `ID: ${eventId}` : "Selecione um evento para ver os detalhes."}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Aqui entra o resumo do evento, métricas e atalhos para editar informações ou lotes de
              ingressos.
            </Typography>
          </Session>
        </Stack>
      </Container>
    </Box>
  );
}
