import { Box, Container, Typography } from "@mui/material";
import { colors } from "@/app/theme/tokens/colors";
import { radius } from "@/app/theme/tokens/radius";
import { shadows } from "@/app/theme/tokens/shadows";
import { spacing } from "@/app/theme/tokens/spacing";

export default function FinanceiroPage() {
  return (
    <Container sx={{ maxWidth: "1120px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
        <Box component="header" sx={{ display: "grid", gap: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Financeiro
          </Typography>
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            Acompanhe repasses, taxas e relatórios financeiros.
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
          }}
        >
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            Em breve: extratos, repasses e relatórios.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

