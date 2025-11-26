"use client";

import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { colors } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";

export function CreateEventWidget() {
  const steps = [
    {
      title: "Cadastre seu evento",
      description: "Defina nome, data, categorias e disponibilize os ingressos.",
    },
    {
      title: "Personalize a divulgação",
      description: "Use páginas temáticas e comunique-se com o seu público.",
    },
    {
      title: "Acompanhe em tempo real",
      description: "Monitoramento de vendas, check-in e relatórios completos.",
    },
  ];

  return (
    <Container sx={{ mt: 6 }}>
      <Box
        sx={{
          bgcolor: colors.primary[900],
          borderRadius: 4,
          boxShadow: shadows.card,
          p: { xs: 3, md: 5 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          color: colors.text.onPrimary,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography fontWeight={700} fontSize="1.5rem" mb={1}>
            Crie seu evento com a Atrium
          </Typography>
          <Typography variant="body1" sx={{ color: colors.neutral[100], mb: 3 }}>
            Gere ingressos, controle vendas e faça a gestão completa em um só
            lugar. Ideal para quem está começando e para produtores experientes.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: 999,
              bgcolor: colors.secondary[500],
              color: colors.text.onSecondary,
              textTransform: "none",
              px: 4,
              "&:hover": { bgcolor: colors.secondary[700] },
            }}
          >
            Começar agora
          </Button>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          {steps.map((step, index) => (
            <Box key={step.title} sx={{ display: "flex", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: colors.secondary[500],
                  color: colors.text.onSecondary,
                  fontWeight: 600,
                  width: 48,
                  height: 48,
                }}
              >
                {index + 1}
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{step.title}</Typography>
                <Typography variant="body2" sx={{ color: colors.neutral[100] }}>
                  {step.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
