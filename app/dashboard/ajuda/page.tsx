import { Box, Button, Container, Typography } from "@mui/material";
import { colors } from "@/app/theme/tokens/colors";
import { radius } from "@/app/theme/tokens/radius";
import { shadows } from "@/app/theme/tokens/shadows";
import { spacing } from "@/app/theme/tokens/spacing";

export default function AjudaPage() {
  return (
    <Container sx={{ maxWidth: "1120px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
        <Box component="header" sx={{ display: "grid", gap: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Ajuda
          </Typography>
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            Encontre respostas rápidas ou fale com o suporte.
          </Typography>
        </Box>

        <Box
          component="section"
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
            Precisa de ajuda?
          </Typography>
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            Em breve: base de conhecimento e chat com suporte.
          </Typography>
          <Box>
            <Button variant="outlined">Falar com suporte</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

