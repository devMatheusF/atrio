"use client";

import { Box, Container, IconButton, Button, Paper, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { colors } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";
import { spacing } from "@/app/theme/tokens/spacing";

export function Hero() {
  return (
    <Container sx={{ mt: 4 }}>
      <SearchBar />

      <Box
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: 0,
            zIndex: 5,
            bgcolor: colors.background.surface,
            boxShadow: 1,
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <CarouselCard
          image="https://media.istockphoto.com/id/1473077427/pt/vetorial/catholic-church-building-isolated-on-white-background-religious-architecture-facade-tall.jpg?s=612x612&w=0&k=20&c=cDtfqFVlfGyUV2qqTR4wzS_UDzpGOQa-XMuWF6kMbXs="
          title="Fafá de Belém - Sucessos"
          date="19 de Novembro às 21h"
          location="Porto Alegre - RS"
          ctaLabel="Ver eventos"
          secondaryCtaLabel="Saiba mais"
        />

        <IconButton
          sx={{
            position: "absolute",
            right: 0,
            zIndex: 5,
            bgcolor: colors.background.surface,
            boxShadow: 1,
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Container>
  );
}

function CarouselCard({
  image,
  title,
  date,
  location,
  ctaLabel,
  secondaryCtaLabel,
}: {
  image: string;
  title: string;
  date: string;
  location: string;
  ctaLabel: string;
  secondaryCtaLabel: string;
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        width: "100%",
        maxWidth: 1000,
        padding: spacing.sm,
        mx: "auto",
        cursor: "pointer",
        transition: "transform .2s",
        bgcolor: colors.background.surface,
        boxShadow: shadows.card,
        "&:hover": { transform: "scale(1.01)" },
      }}
    >
      <Box
        sx={{
          height: 280,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Box sx={{ p: 2 }}>
        <Typography fontWeight={600}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, mt: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: colors.primary[500],
              color: colors.text.onPrimary,
              textTransform: "none",
              borderRadius: 999,
              px: 3,
              "&:hover": { bgcolor: colors.primary[700] },
            }}
          >
            {ctaLabel}
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: colors.primary[700],
              borderColor: colors.primary[300],
              textTransform: "none",
              borderRadius: 999,
              px: 3,
              "&:hover": {
                borderColor: colors.primary[500],
                bgcolor: colors.primary[100],
              },
            }}
          >
            {secondaryCtaLabel}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

function SearchBar() {
  return (
    <TextField
      fullWidth
      placeholder="Buscar experiências"
      InputProps={{
        sx: {
          borderRadius: 3,
          bgcolor: colors.background.surface,
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
