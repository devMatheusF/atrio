"use client";

import { useMemo, useState } from "react";
import { Controller, useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Chip,
  Grid,
  LinearProgress,
  MenuItem,
  TextField,
  Stack,
  Typography,
} from "@mui/material";

import { Session } from "@/app/shared/components/Session";
import {
  myEventsFiltersSchema,
  MyEventsFiltersValues,
} from "@/app/shared/validation/events/myEventsFiltersSchema";
import { colors } from "@/app/theme/tokens/colors";
import { radius } from "@/app/theme/tokens/radius";
import { spacing } from "@/app/theme/tokens/spacing";
import { sizes } from "@/app/theme/tokens/sizes";

type EventStatus = "published" | "closed";

type EventItem = {
  id: string;
  name: string;
  date: string;
  location: string;
  status: EventStatus;
  tickets: {
    available: number;
    sold: number;
  };
};

type MyEventsSectionProps = {
  events?: EventItem[];
};

const DEFAULT_FILTERS: MyEventsFiltersValues = {
  search: "",
  status: "",
};

export function MyEventsSection({ events = [] }: MyEventsSectionProps) {
  const [appliedFilters, setAppliedFilters] = useState<MyEventsFiltersValues>(DEFAULT_FILTERS);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MyEventsFiltersValues>({
    resolver: zodResolver(myEventsFiltersSchema) as Resolver<MyEventsFiltersValues>,
    defaultValues: DEFAULT_FILTERS,
  });

  const filteredEvents = useMemo(() => {
    const searchTerm = appliedFilters.search?.toLowerCase() ?? "";
    const statusFilter = appliedFilters.status ?? "";

    return events.filter((event) => {
      const matchesSearch = searchTerm
        ? event.name.toLowerCase().includes(searchTerm) || event.location.toLowerCase().includes(searchTerm)
        : true;
      const matchesStatus = statusFilter ? event.status === statusFilter : true;

      return matchesSearch && matchesStatus;
    });
  }, [appliedFilters, events]);

  const hasEvents = events.length > 0;

  const onSubmit: SubmitHandler<MyEventsFiltersValues> = (values) => {
    setAppliedFilters(values);
  };

  const handleClear = () => {
    reset(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  };

  if (!hasEvents) {
    return (
      <Session>
        <Stack sx={{ gap: `${spacing.sm}px`, textAlign: "left" }}>
          <Typography variant="h6" sx={{ color: colors.text.primary }}>
            Nenhum evento ainda
          </Typography>
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            Dê o primeiro passo para unir pessoas em adoração e aprendizado. Crie um encontro e convide sua
            comunidade.
          </Typography>
          <Box>
            <Button variant="contained" color="primary">
              Criar meu primeiro evento
            </Button>
          </Box>
        </Stack>
      </Session>
    );
  }

  return (
    <Session>
      <Stack sx={{ gap: `${spacing.lg}px` }}>
        <Stack direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "space-between", gap: `${spacing.sm}px` }}>
          <Typography variant="h6" sx={{ color: colors.text.primary }}>
            Meus eventos
          </Typography>
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            Organize e acompanhe seus encontros presenciais e online.
          </Typography>
        </Stack>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ bgcolor: colors.background.default, borderRadius: `${radius.xs}px`, p: `${spacing.md}px` }}
        >
          <Grid container>
            <Grid container spacing={10} sx={{ flexGrow: 1 }}>
              <Grid>
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Buscar pelo nome do evento"
                      placeholder="Ex.: Conferência Jovem"
                      error={!!errors.search}
                      helperText={errors.search?.message}
                    />
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth={false}
                      sx={{minWidth: sizes.md * 10}}
                      label="Filtrar por..."
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="published">Eventos publicados</MenuItem>
                      <MenuItem value="closed">Eventos encerrados</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
            
            <Grid              
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: `${spacing.sm}px`,
                justifyContent: { xs: "flex-start", md: "flex-end" },
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Aplicar
              </Button>
              <Button type="button" variant="text" color="primary" onClick={handleClear}>
                Limpar
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Stack sx={{ gap: `${spacing.md}px` }}>
          {filteredEvents.map((event) => {
            const total = event.tickets.available + event.tickets.sold;
            const progress = total ? Math.min(100, Math.round((event.tickets.sold / total) * 100)) : 0;

            return (
              <Box
                key={event.id}
                sx={{
                  border: `1px solid ${colors.neutral[100]}`,
                  borderRadius: `${radius.xs}px`,
                  p: `${spacing.md}px`,
                  bgcolor: colors.background.surface,
                }}
              >
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  sx={{ gap: `${spacing.md}px`, alignItems: { md: "center" }, justifyContent: "space-between" }}
                >
                  <Stack sx={{ gap: `${spacing.xs}px`, minWidth: 0 }}>
                    <Stack direction="row" sx={{ alignItems: "center", gap: `${spacing.sm}px` }}>
                      <Chip
                        label={event.status === "published" ? "Publicado" : "Encerrado"}
                        color={event.status === "published" ? "success" : "default"}
                        size="small"
                      />
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        {event.date}
                      </Typography>
                    </Stack>
                    <Typography variant="h6" sx={{ color: colors.text.primary, whiteSpace: "pre-line" }}>
                      {event.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                      {event.location}
                    </Typography>
                  </Stack>

                  <Stack sx={{ minWidth: 240, gap: `${spacing.xs}px` }}>
                    <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                      Ingressos ({event.tickets.sold}/{total})
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 10,
                        borderRadius: `${radius.xs}px`,
                        bgcolor: colors.neutral[100],
                        "& .MuiLinearProgress-bar": {
                          borderRadius: `${radius.xs}px`,
                        },
                      }}
                    />
                  </Stack>

                  <Stack direction="row" sx={{ gap: `${spacing.sm}px`, flexShrink: 0 }}>
                    <Button variant="outlined" color="primary">
                      Gerenciar
                    </Button>
                    <Button variant="contained" color="primary">
                      Ver página
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            );
          })}

          {!filteredEvents.length && (
            <Box
              sx={{
                border: `1px dashed ${colors.neutral[300]}`,
                borderRadius: `${radius.xs}px`,
                p: `${spacing.md}px`,
                bgcolor: colors.background.surface,
              }}
            >
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                Nenhum evento corresponde aos filtros selecionados. Ajuste os critérios ou limpe os filtros para
                ver todos os eventos.
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </Session>
  );
}
