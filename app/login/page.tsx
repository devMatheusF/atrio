"use client";

import { Box } from "@mui/material";
import { colors } from "../theme/tokens/colors";
import { LoginFormSection, LoginHeader, LoginHero } from "../components/login";

export default function LoginPage() {
  return (
    <Box sx={{ bgcolor: colors.background.default, minHeight: "100vh", pb: 8 }}>
      <LoginHeader />
      <LoginFormSection />      
      <LoginHero />      
    </Box>
  );
}
