"use client";

import { Avatar, Box, Chip, Container, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { colors } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";

const highlights = [
  {
    icon: <LockIcon fontSize="small" />,
    title: "Segurança em primeiro lugar",
    description: "Autenticação robusta e monitoramento constante dos acessos.",
  },
  {
    icon: <AutoGraphIcon fontSize="small" />,
    title: "Painel atualizado",
    description: "Veja vendas e check-ins assim que acessar a plataforma.",
  },
  {
    icon: <Diversity3Icon fontSize="small" />,
    title: "Equipe conectada",
    description: "Convide produtores e colabore com várias funções no evento.",
  },
];

export function LoginHero() {
  return (
    <Container sx={{ mt: 5 }}>
      <Box
        sx={{
          bgcolor: colors.background.surface,
          borderRadius: 4,
          boxShadow: shadows.card,
          p: { xs: 3, md: 5 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Chip
            label="Acesso do produtor"
            sx={{
              bgcolor: colors.primary[100],
              color: colors.primary[700],
              borderRadius: 999,
              fontWeight: 600,
              mb: 2,
            }}
          />
          <Typography fontWeight={700} fontSize="1.8rem" mb={1}>
            Entre e retome seus eventos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie participantes, configure campanhas e acompanhe cada passo da sua operação de eventos no mesmo painel.
          </Typography>
        </Box>

        <Box sx={{ flex: 1, display: "grid", gap: 2 }}>
          {highlights.map((highlight) => (
            <Box
              key={highlight.title}
              sx={{
                borderRadius: 3,
                border: `1px solid ${colors.neutral[200]}`,
                p: 2.5,
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: colors.primary[700],
                  color: colors.text.onPrimary,
                  width: 48,
                  height: 48,
                }}
              >
                {highlight.icon}
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{highlight.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {highlight.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
