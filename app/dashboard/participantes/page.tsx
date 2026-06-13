import { Box, Container, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { colors } from "@/app/theme/tokens/colors";
import { radius } from "@/app/theme/tokens/radius";
import { shadows } from "@/app/theme/tokens/shadows";
import { spacing } from "@/app/theme/tokens/spacing";

export default function ParticipantesPage() {
  return (
    <Container sx={{ maxWidth: "1120px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
        <Box component="header" sx={{ display: "grid", gap: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Participantes
          </Typography>
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            Gerencie e exporte a lista de participantes do seu evento.
          </Typography>
        </Box>

        <Box
          component="section"
          aria-label="Estado vazio de participantes"
          sx={{
            bgcolor: colors.background.surface,
            border: `1px solid ${colors.neutral[300]}`,
            borderRadius: radius.lg,
            boxShadow: shadows.card,
            p: spacing.lg,
          }}
        >
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              textAlign: "center",
              py: spacing.xl,
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
              <PeopleAltOutlinedIcon />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Nenhum participante ainda
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary, maxWidth: 540 }}>
              Quando alguém comprar ou reservar um ingresso, os participantes aparecerão aqui.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
