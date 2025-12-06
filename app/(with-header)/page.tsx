"use client";

import { Box } from "@mui/material";
import { colors } from "@/app/theme/tokens/colors";
import {
  Collections,
  CreateEventWidget,
  FAQSection,
  Hero,
  MostPurchasedEvents,
  TodaysEvents,
} from "@/app/components/home";

export default function Home() {
  return (
    <Box sx={{ bgcolor: colors.background.default, pb: 8 }}>
      <Hero />
      <Collections />
      <MostPurchasedEvents />
      <TodaysEvents />
      <CreateEventWidget />
      <FAQSection />
    </Box>
  );
}
