"use client";

import { useState } from "react";
import { Box, Button, Chip, Container, Typography } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { colors } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";

export function Collections() {
  const items = [
    { label: "Festas e Shows", icon: <CelebrationIcon /> },
    { label: "Esportes", icon: <SportsSoccerIcon /> },
    { label: "Stand Up Comedy", icon: <EmojiEventsIcon /> },
    { label: "Passeios e Tours", icon: <LocationOnIcon /> },
    { label: "Congresso e Palestras", icon: <EmojiEventsIcon /> },
  ];
  const [selected, setSelected] = useState(items[0]?.label ?? "");

  return (
    <Container sx={{ mt: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography fontWeight={600} fontSize="1.2rem">
          Explore nossas coleções
        </Typography>
        <Button
          variant="text"
          sx={{
            color: colors.primary[700],
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { color: colors.primary[500], backgroundColor: "transparent" },
          }}
        >
          Ver tudo
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
        {items.map((item) => {
          const isSelected = selected === item.label;
          return (
            <Chip
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => setSelected(item.label)}
              clickable
              sx={{
                borderRadius: 2,
                px: 1.5,
                py: 1,
                bgcolor: isSelected ? colors.primary[100] : colors.neutral[0],
                color: isSelected ? colors.primary[700] : colors.neutral[700],
                border: `1px solid ${isSelected ? "transparent" : colors.neutral[300]}`,
                boxShadow: isSelected ? shadows.card : "none",
                "& .MuiChip-icon": {
                  color: isSelected ? colors.primary[700] : colors.neutral[500],
                },
                "&:hover": {
                  borderColor: colors.primary[300],
                },
              }}
            />
          );
        })}
      </Box>
    </Container>
  );
}
