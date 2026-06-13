"use client";

import { useState } from "react";
import { Box, Typography, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";

export function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const menuButtonAriaLabel = isMenuOpen ? "Fechar menu" : "Abrir menu";

  const navActions = (
    <>
      <HeaderLink label="Meus eventos" onClick={closeMenu} href="/meus-eventos"/>
      <HeaderLink label="Login" href="/login" onClick={closeMenu} />
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
        onClick={closeMenu}
      >
        Criar evento
      </Button>
    </>
  );

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        bgcolor: colors.primary[900],
        borderBottom: `1px solid ${colors.primary[700]}`,
        boxShadow: isMenuOpen && isMobile ? shadows.card : "none",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontWeight="bold" fontSize="1.4rem" sx={{ color: colors.secondary[500] }}>
          Átrio{" "}
          <Box component="span" sx={{ color: colors.text.onPrimary, fontWeight: 400 }}>
            Platform
          </Box>
        </Typography>

        {isMobile ? (
          <IconButton
            aria-label={menuButtonAriaLabel}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            sx={{
              color: colors.text.onPrimary,
              border: `1px solid ${colors.primary[700]}`,
              borderRadius: 2,
              p: 1,
              "&:hover": {
                bgcolor: colors.primary[700],
              },
            }}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>{navActions}</Box>
        )}
      </Box>

      {isMobile && isMenuOpen && (
        <Box
          sx={{
            px: 2,
            pb: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            bgcolor: colors.primary[900],
          }}
        >
          {navActions}
        </Box>
      )}
    </Box>
  );
}

function HeaderLink({
  label,
  href,
  onClick,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="text"
      disableRipple
      sx={{
        color: colors.text.onPrimary,
        textTransform: "none",
        position: "relative",
        fontWeight: 500,
        justifyContent: "flex-start",
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
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
