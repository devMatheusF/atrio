"use client";

import { Box, Container, Stack, Typography } from "@mui/material";

import { MyEventsSection, WelcomeActions } from "@/app/components/meus-eventos";
import { colors } from "@/app/theme/tokens/colors";
import { spacing } from "@/app/theme/tokens/spacing";

export default function MeusEventosPage() {
  const mockEvents = [
    {
      id: "1",
      name: "Conferência Luz e Vida 2024",
      date: "12 de maio de 2024 às 19h",
      location: "Igreja Esperança Viva, São Paulo - SP",
      status: "published",
      tickets: { available: 120, sold: 80 },
    },
    {
      id: "2",
      name: "Noite de Louvor e Adoração",
      date: "25 de junho de 2024 às 20h",
      location: "Online (YouTube / Zoom)",
      status: "closed",
      tickets: { available: 0, sold: 240 },
    },
  ];

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
              Meus eventos
            </Typography>
            <Typography variant="body1" sx={{ color: colors.text.secondary }}>
              Acompanhe e gerencie os eventos que você está promovendo.
            </Typography>
          </Stack>

          <WelcomeActions userName="Matheus" />
          <MyEventsSection events={mockEvents} />
        </Stack>
      </Container>
    </Box>
  );
}
