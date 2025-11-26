"use client";

import { Box, Typography, Button } from "@mui/material";
import { colors } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";

export function Header() {
  return (
    <Box
      sx={{
        px: 2,
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${colors.primary[700]}`,
        position: "sticky",
        top: 0,
        bgcolor: colors.primary[900],
        zIndex: 10,
      }}
    >
      <Typography fontWeight="bold" fontSize="1.4rem" sx={{ color: colors.secondary[500] }}>
        Atrium{" "}
        <Box component="span" sx={{ color: colors.text.onPrimary, fontWeight: 400 }}>
          Platform
        </Box>
      </Typography>

      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <HeaderLink label="Meus eventos" />
        <HeaderLink label="Login" href="/login"/>
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: colors.primary[500],
            color: colors.text.onPrimary,
            borderRadius: 999,
            px: 2.5,
            textTransform: "none",
            boxShadow: shadows.card,
            "&:hover": {
              bgcolor: colors.primary[700],
              boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
            },
          }}
        >
          Criar evento
        </Button>
      </Box>
    </Box>
  );
}

function HeaderLink({ label, href }: { label: string, href?: string }) {
  return (
    <Button
      variant="text"
      disableRipple
      sx={{
        color: colors.text.onPrimary,
        textTransform: "none",
        position: "relative",
        fontWeight: 500,
        "&:after": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 2,
          width: "100%",
          height: 2,
          bgcolor: colors.secondary[300],
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.3s ease",
        },
        "&:hover": {
          color: colors.secondary[300],
          backgroundColor: "transparent",
          "&:after": { transform: "scaleX(1)" },
        },
      }}
      href={href}
    >
      {label}
    </Button>
  );
}
