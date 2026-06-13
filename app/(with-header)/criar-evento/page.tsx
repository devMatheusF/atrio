import { Box } from "@mui/material";
import { CreateEventForm } from "@/app/components/create-event/CreateEventForm";
import { colors } from "@/app/theme/tokens/colors";

type CriarEventoPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function CriarEventoPage({ searchParams }: CriarEventoPageProps) {
  const isOnline = Boolean(searchParams?.online);
  const isPresencial = Boolean(searchParams?.presencial);

  const eventType: "presencial" | "online" = isOnline ? "online" : isPresencial ? "presencial" : "presencial";

  return (
    <Box sx={{ bgcolor: colors.background.default, minHeight: "100vh", pb: 12 }}>
      <CreateEventForm initialEventType={eventType} />
    </Box>
  );
}
