import { Box, Button, Container, Typography } from "@mui/material";
import { colors } from "@/app/theme/tokens/colors";
import { radius } from "@/app/theme/tokens/radius";
import { shadows } from "@/app/theme/tokens/shadows";
import { spacing } from "@/app/theme/tokens/spacing";

export default function IngressosPage() {
  return (
    <Container sx={{ maxWidth: "1120px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
        <Box component="header" sx={{ display: "grid", gap: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Ingressos
          </Typography>
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            Configure tipos de ingresso, valores e disponibilidade.
          </Typography>
        </Box>

        <Box
          component="section"
          aria-label="Estado vazio de ingressos"
          sx={{
            bgcolor: colors.background.surface,
            border: `1px solid ${colors.neutral[300]}`,
            borderRadius: radius.lg,
            boxShadow: shadows.card,
            p: spacing.lg,
            display: "flex",
            flexDirection: "column",
            gap: spacing.sm,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Nenhum ingresso cadastrado
          </Typography>
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            Crie o primeiro tipo de ingresso para começar a vender ou distribuir convites.
          </Typography>
          <Box>
            <Button variant="contained">Criar ingresso</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

