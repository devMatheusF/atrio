"use client";

import { Box } from "@mui/material";
import { colors } from "@/app/theme/tokens/colors";
import { radius } from "@/app/theme/tokens/radius";
import { shadows } from "@/app/theme/tokens/shadows";
import { spacing } from "@/app/theme/tokens/spacing";

type SessionProps = {
  children: React.ReactNode;
};

export function Session({ children }: SessionProps) {
  return (
    <Box
      sx={{
        bgcolor: colors.background.surface,
        borderRadius: radius.xs,
        boxShadow: shadows.card,
        p: `${spacing.lg}px`,
      }}
    >
      {children}
    </Box>
  );
}
