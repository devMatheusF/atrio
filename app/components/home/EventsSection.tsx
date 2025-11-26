"use client";

import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { colors } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";

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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, minmax(0, 1fr))",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        {events.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </Box>
    </Container>
  );
}

function EventCard(event: EventCardInfo) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Button
          size="small"
          variant="contained"
          sx={{
            bgcolor: colors.primary[500],
            color: colors.text.onPrimary,
            textTransform: "none",
            borderRadius: 999,
            px: 2,
            "&:hover": { bgcolor: colors.primary[700] },
          }}
        >
          Ver detalhes
        </Button>
      </CardActions>
    </Card>
  );
}
