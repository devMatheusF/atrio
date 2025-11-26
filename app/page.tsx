"use client";

import { Box } from "@mui/material";
import { colors } from "./theme/tokens/colors";
import {
  Collections,
  CreateEventWidget,
  FAQSection,
  Header,
  Hero,
  MostPurchasedEvents,
  TodaysEvents,
} from "./components/home";

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
