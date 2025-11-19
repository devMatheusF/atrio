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
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useState, ReactNode } from "react";
import { colors } from "./theme/tokens/colors";
import { shadows } from "./theme/tokens/shadows";

export default function Home() {
  return (
    <Box sx={{ bgcolor: colors.background.default, pb: 8 }}>
      <Header />
      <Hero />
      <Collections />
      <MostPurchasedEvents />
      <TodaysEvents />
      <CreateEventWidget />
      <FAQSection />
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
        borderBottom: `1px solid ${colors.primary[700]}`,
        position: "sticky",
        top: 0,
        bgcolor: colors.primary[900],
        zIndex: 10,
      }}
    >
      <Typography fontWeight="bold" fontSize="1.4rem" sx={{ color: colors.secondary[500] }}>
        Atrium{" "}
        <Box component="span" sx={{ color: colors.text.onPrimary, fontWeight: 400 }}>
          Platform
        </Box>
      </Typography>

      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <HeaderLink label="Meus eventos" />
        <HeaderLink label="Login" />
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
        >
          Criar evento
        </Button>
      </Box>
    </Box>
  );
}

function HeaderLink({ label }: { label: string }) {
  return (
    <Button
      variant="text"
      disableRipple
      sx={{
        color: colors.text.onPrimary,
        textTransform: "none",
        position: "relative",
        fontWeight: 500,
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
    >
      {label}
    </Button>
  );
}

/* ---------------------- HERO CAROUSEL ---------------------- */

function Hero() {
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
          image="https://source.unsplash.com/random/800x400?concert"
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

/* ---------------------- MOST PURCHASED EVENTS ---------------------- */

function MostPurchasedEvents() {
  const events = [
    {
      title: "Festival Ritmos do Sul",
      date: "Hoje, 22h",
      location: "Curitiba - PR",
      priceRange: "A partir de R$ 95",
      image: "https://source.unsplash.com/random/800x800?party",
    },
    {
      title: "Workshop de Marketing Digital",
      date: "Amanhã, 19h",
      location: "Online",
      priceRange: "A partir de R$ 59",
      image: "https://source.unsplash.com/random/800x800?workshop",
    },
    {
      title: "Passeio Gastronômico",
      date: "23 Nov, 12h",
      location: "São Paulo - SP",
      priceRange: "A partir de R$ 180",
      image: "https://source.unsplash.com/random/800x800?food",
    },
    {
      title: "Corrida Noturna da Lagoa",
      date: "25 Nov, 20h",
      location: "Rio de Janeiro - RJ",
      priceRange: "A partir de R$ 75",
      image: "https://source.unsplash.com/random/800x800?running",
    },
  ];

  return (
    <EventsSection
      title="Mais comprados nas últimas 24h"
      subtitle="O que a comunidade está garantindo agora mesmo"
      events={events}
    />
  );
}

/* ---------------------- TODAY EVENTS ---------------------- */

function TodaysEvents() {
  const events = [
    {
      title: "Stand-up Clube do Riso",
      date: "Hoje, 21h",
      location: "Belo Horizonte - MG",
      priceRange: "A partir de R$ 40",
      image: "https://source.unsplash.com/random/800x800?standup",
    },
    {
      title: "Feira Criativa Aurora",
      date: "Hoje, 10h",
      location: "Florianópolis - SC",
      priceRange: "Entrada gratuita",
      image: "https://source.unsplash.com/random/800x800?market",
    },
    {
      title: "Jogos Universitários",
      date: "Hoje, 16h",
      location: "São José dos Campos - SP",
      priceRange: "A partir de R$ 25",
      image: "https://source.unsplash.com/random/800x800?sports",
    },
    {
      title: "Oficina de Cerâmica",
      date: "Hoje, 18h",
      location: "Recife - PE",
      priceRange: "A partir de R$ 120",
      image: "https://source.unsplash.com/random/800x800?art",
    },
  ];

  return (
    <EventsSection
      title="Acontecendo hoje"
      subtitle="Seleção de eventos imperdíveis para sair do papel agora"
      events={events}
    />
  );
}

/* ---------------------- GENERIC EVENTS SECTION ---------------------- */

type EventCardInfo = {
  title: string;
  date: string;
  location: string;
  priceRange: string;
  image: string;
};

function EventsSection({
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
      <CardMedia
        component="img"
        height={160}
        image={event.image}
        alt={event.title}
      />
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
        <Typography
          variant="subtitle2"
          sx={{ color: colors.secondary[500], fontWeight: 600 }}
        >
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

/* ---------------------- CREATE EVENT WIDGET ---------------------- */

function CreateEventWidget() {
  const steps = [
    {
      title: "Cadastre seu evento",
      description: "Defina nome, data, categorias e disponibilize os ingressos.",
    },
    {
      title: "Personalize a divulgação",
      description: "Use páginas temáticas e comunique-se com o seu público.",
    },
    {
      title: "Acompanhe em tempo real",
      description: "Monitoramento de vendas, check-in e relatórios completos.",
    },
  ];

  return (
    <Container sx={{ mt: 6 }}>
      <Box
        sx={{
          bgcolor: colors.primary[900],
          borderRadius: 4,
          boxShadow: shadows.card,
          p: { xs: 3, md: 5 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          color: colors.text.onPrimary,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography fontWeight={700} fontSize="1.5rem" mb={1}>
            Crie seu evento com a Atrium
          </Typography>
          <Typography variant="body1" sx={{ color: colors.neutral[100], mb: 3 }}>
            Gere ingressos, controle vendas e faça a gestão completa em um só
            lugar. Ideal para quem está começando e para produtores experientes.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: 999,
              bgcolor: colors.secondary[500],
              color: colors.text.onSecondary,
              textTransform: "none",
              px: 4,
              "&:hover": { bgcolor: colors.secondary[700] },
            }}
          >
            Começar agora
          </Button>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          {steps.map((step, index) => (
            <Box key={step.title} sx={{ display: "flex", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: colors.secondary[500],
                  color: colors.text.onSecondary,
                  fontWeight: 600,
                  width: 48,
                  height: 48,
                }}
              >
                {index + 1}
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{step.title}</Typography>
                <Typography variant="body2" sx={{ color: colors.neutral[100] }}>
                  {step.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

/* ---------------------- FAQ ---------------------- */

function FAQSection() {
  const faqs = [
    {
      question: "Como publico um evento gratuito?",
      answer:
        "Basta criar um evento normalmente e selecionar a opção de ingresso gratuito. Você ainda pode controlar o número de vagas e acompanhar check-ins em tempo real.",
    },
    {
      question: "Posso parcelar o valor do ingresso?",
      answer:
        "Sim. Ative o parcelamento para oferecer mais flexibilidade ao seu público. As vendas caem direto na sua conta de forma segura.",
    },
    {
      question: "Quais ferramentas tenho para divulgar?",
      answer:
        "Você conta com landing pages personalizadas, códigos promocionais, integração com redes sociais e disparo de campanhas segmentadas.",
    },
    {
      question: "Existe suporte durante o evento?",
      answer:
        "Claro. Monitoramos o desempenho do evento com você e temos uma equipe pronta para auxiliar durante toda a operação.",
    },
  ];

  return (
    <Container sx={{ mt: 6 }}>
      <Box
        sx={{
          bgcolor: colors.background.surface,
          borderRadius: 4,
          boxShadow: shadows.card,
          p: { xs: 3, md: 4 },
        }}
      >
        <Typography fontWeight={600} fontSize="1.2rem">
          Perguntas frequentes
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Tire as dúvidas mais comuns sobre a plataforma.
        </Typography>

        {faqs.map((faq) => (
          <Accordion
            key={faq.question}
            sx={{
              mb: 1.5,
              borderRadius: 2,
              bgcolor: colors.background.surface,
              boxShadow: "none",
              border: `1px solid ${colors.neutral[300]}`,
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600} sx={{ color: colors.text.primary }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <FeedbackBanners />
      </Box>
    </Container>
  );
}

function FeedbackBanners() {
  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <FeedbackBanner
        icon={<CheckCircleOutlineIcon color="success" />}
        title="Compra concluída"
        description="Enviamos o ingresso e atualizamos o painel em tempo real."
        bgcolor="#E8F5E9"
        textColor={colors.feedback.success}
      />
      <FeedbackBanner
        icon={<ErrorOutlineIcon color="error" />}
        title="Pagamento não aprovado"
        description="Revise os dados do cartão ou escolha outro método de pagamento."
        bgcolor="#FFEBEE"
        textColor={colors.feedback.error}
      />
    </Box>
  );
}

function FeedbackBanner({
  icon,
  title,
  description,
  bgcolor,
  textColor,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  bgcolor: string;
  textColor: string;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor,
        borderRadius: 3,
        p: 2.5,
        border: `1px solid ${textColor}22`,
        display: "flex",
        gap: 1.5,
        alignItems: "flex-start",
      }}
    >
      {icon}
      <Box>
        <Typography fontWeight={600} sx={{ color: textColor }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.text.secondary }}>
          {description}
        </Typography>
      </Box>
    </Box>
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

/* ---------------------- SEARCH ---------------------- */

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

/* ---------------------- COLLECTIONS ---------------------- */

function Collections() {
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
                border: `1px solid ${
                  isSelected ? "transparent" : colors.neutral[300]
                }`,
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
