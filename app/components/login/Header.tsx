"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { colors } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";

export function LoginHeader() {
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
      <Typography fontWeight="bold" fontSize="1.3rem" sx={{ color: colors.secondary[500] }}>
        Átrio{" "}
        <Box component="span" sx={{ color: colors.text.onPrimary, fontWeight: 400 }}>
          Platform
        </Box>
      </Typography>

      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Button
          component={Link}
          href="/"
          variant="text"
          sx={{
            color: colors.text.onPrimary,
            textTransform: "none",
            "&:hover": { color: colors.secondary[300], backgroundColor: "transparent" },
          }}
        >
          Voltar para a home
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: colors.secondary[500],
            color: colors.text.onSecondary,
            borderRadius: 999,
            px: 2.5,
            textTransform: "none",
            boxShadow: shadows.card,
            "&:hover": {
              bgcolor: colors.secondary[700],
              boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
            },
          }}
        >
          Criar conta
        </Button>
      </Box>
    </Box>
  );
}
