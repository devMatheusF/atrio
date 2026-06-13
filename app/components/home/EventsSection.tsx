"use client";

import { useCallback, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "@mui/material/Link";
import { colors } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";
import { spacing } from "@/app/theme/tokens/spacing";

export type EventCardInfo = {
  title: string;
  date: string;
  location: string;
  priceRange: string;
  image: string;
};

export function EventsSection({
  title,
  subtitle,
  events,
}: {
  title: string;
  subtitle: string;
  events: EventCardInfo[];
}) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = useCallback((direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const delta = direction === "right" ? scrollAmount : -scrollAmount;
    container.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <Container sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography fontWeight={600} fontSize="1.2rem">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderColor: colors.primary[300],
            color: colors.primary[700],
            textTransform: "none",
            borderRadius: 999,
            px: 2.5,
            "&:hover": {
              borderColor: colors.primary[500],
              bgcolor: colors.primary[100],
            },
          }}
        >
          Ver mais
        </Button>
      </Box>

      <Box sx={{ position: "relative" }}>
        <Box
          ref={carouselRef}
          sx={{
            display: "flex",
            alignItems: "stretch",
            padding: { xs: spacing.sm, md: spacing.md },
            gap: 4,
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            overscrollBehaviorX: "contain",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
            px: 1,
            display: "flex",
            justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          <IconButton
            aria-label="Evento anterior"
            onClick={() => scrollByAmount("left")}
            sx={{
              pointerEvents: "auto",
              bgcolor: colors.neutral[0],
              border: `1px solid ${colors.primary[100]}`,
              boxShadow: shadows.card,
              "&:hover": {
                bgcolor: colors.primary[100],
              },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="Próximo evento"
            onClick={() => scrollByAmount("right")}
            sx={{
              pointerEvents: "auto",
              bgcolor: colors.neutral[0],
              border: `1px solid ${colors.primary[100]}`,
              boxShadow: shadows.card,
              "&:hover": {
                bgcolor: colors.primary[100],
              },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
}

function EventCard(event: EventCardInfo) {
  return (
    <Link
      href="#"
      underline="none"
      sx={{
        display: "flex",
        gap: spacing.sm,
        flexDirection: "column",
        flex: "0 0 240px",
        minWidth: 240,
        scrollSnapAlign: "start",
      }}
    >
      <Card
        sx={{
          borderRadius: 1,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          minWidth: "100%",
          maxWidth: "100%",
          minHeight: 114,
          maxHeight: 114,
          border: "1px solid transparent",
          bgcolor: colors.neutral[0],
          transition: "all 0.3s ease",
          boxShadow: "none",
          "&:hover": {
            borderColor: colors.primary[100],
            boxShadow: shadows.card,
          },
        }}
      >
        <CardMedia component="img" height={160} image={event.image} alt={event.title} />
      </Card>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography fontWeight={600} mb={0.5}>
          {event.title}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.text.secondary }}>
          {event.date}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.text.secondary }} gutterBottom>
          {event.location}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: colors.secondary[500], fontWeight: 600 }}>
          {event.priceRange}
        </Typography>
      </CardContent>
    </Link>
    
  );
}
