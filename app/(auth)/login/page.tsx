"use client";

import { Box } from "@mui/material";
import { colors } from "@/app/theme/tokens/colors";
import { LoginFormSection, LoginHero } from "@/app/components/login";

export default function LoginPage() {
  return (
    <Box sx={{ bgcolor: colors.background.default, minHeight: "100vh", pb: 8 }}>
      <LoginFormSection />
      <LoginHero />
    </Box>
  );
}
