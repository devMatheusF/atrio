"use client";

import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Chip,
  Avatar,
  useMediaQuery,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CelebrationIcon from "@mui/icons-material/Celebration";
import React from "react";

export default function Home() {
  return (
    <Box sx={{ bgcolor: "#fafafa", pb: 8 }}>
      <Header />
      <Hero />
      <Collections />
    </Box>
  );
}

/* ---------------------- HEADER ---------------------- */

function Header() {
  return (
    <Box
      sx={{
        px: 2,
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        bgcolor: "white",
        zIndex: 10,
      }}
    >
      <Typography
        fontWeight="bold"
        fontSize="1.4rem"
        sx={{ color: "#0077ff" }}
      >
        Sympla*
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="text">Criar evento</Button>
        <Button variant="text">Meus eventos</Button>
        <Button variant="outlined" size="small">
          Login
        </Button>
      </Box>
    </Box>
  );
}

/* ---------------------- HERO CAROUSEL ---------------------- */

function Hero() {
  const isMobile = useMediaQuery("(max-width: 600px)");

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
            bgcolor: "white",
            boxShadow: 1,
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <CarouselCard
          image="https://source.unsplash.com/random/800x400?concert"
          title="Fafá de Belém - Sucessos"
          date="19 de Novembro às 21h"
          location="Porto Alegre - RS"
        />

        <IconButton
          sx={{
            position: "absolute",
            right: 0,
            zIndex: 5,
            bgcolor: "white",
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
}: {
  image: string;
  title: string;
  date: string;
  location: string;
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        width: "100%",
        maxWidth: 1000,
        mx: "auto",
        cursor: "pointer",
        transition: "transform .2s",
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
      </Box>
    </Paper>
  );
}

/* ---------------------- SEARCH ---------------------- */

function SearchBar() {
  return (
    <TextField
      fullWidth
      placeholder="Buscar experiências"
      InputProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "white",
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

/* ---------------------- COLLECTIONS ---------------------- */

function Collections() {
  const items = [
    { label: "Festas e Shows", icon: <CelebrationIcon /> },
    { label: "Esportes", icon: <SportsSoccerIcon /> },
    { label: "Stand Up Comedy", icon: <EmojiEventsIcon /> },
    { label: "Passeios e Tours", icon: <LocationOnIcon /> },
    { label: "Congresso e Palestras", icon: <EmojiEventsIcon /> },
  ];

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
        <Button variant="text">Ver tudo</Button>
      </Box>

      <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
        {items.map((item) => (
          <Chip
            key={item.label}
            label={item.label}
            icon={item.icon}
            sx={{
              borderRadius: 2,
              bgcolor: "white",
              boxShadow: 1,
              px: 1.5,
              py: 1,
            }}
          />
        ))}
      </Box>
    </Container>
  );
}
