"use client";

import { ReactNode } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { colors } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";

export function FAQSection() {
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
