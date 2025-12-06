"use client";

import { Button, Stack, Typography } from "@mui/material";

import { Session } from "@/app/shared/components/Session";
import { colors } from "@/app/theme/tokens/colors";
import { spacing } from "@/app/theme/tokens/spacing";

type WelcomeActionsProps = {
  userName?: string;
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12 && hour > 6) return "Bom dia";
  if (hour < 18 && hour > 12) return "Boa tarde";
  return "Boa noite";
}

export function WelcomeActions({ userName }: WelcomeActionsProps) {
  const greeting = getGreeting();

  return (
    <Session>
      <Stack direction={{ xs: "column", md: "row" }} sx={{ alignItems: "center", gap: `${spacing.lg}px` }}>
        <Stack sx={{ gap: `${spacing.xs}px`, flex: 1 }}>
          <Typography variant="h6" sx={{ color: colors.text.primary }}>
            {greeting}
            {userName ? `, ${userName}` : ""}
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.secondary }}>
            O momento de promover comunhão chegou. Publique um encontro que inspire fé e reúna a igreja.
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: `${spacing.lg}px` }}>
          <Button variant="contained" color="primary">
            Criar evento presencial
          </Button>
          <Button variant="outlined" color="primary">
            Criar evento online
          </Button>
        </Stack>
      </Stack>
    </Session>
  );
}
