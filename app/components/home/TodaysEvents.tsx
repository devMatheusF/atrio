"use client";

import { EventsSection, EventCardInfo } from "./EventsSection";

export function TodaysEvents() {
  const events: EventCardInfo[] = [
    {
      title: "Stand-up Clube do Riso",
      date: "Hoje, 21h",
      location: "Belo Horizonte - MG",
      priceRange: "A partir de R$ 40",
      image: "https://media.istockphoto.com/id/1473077427/pt/vetorial/catholic-church-building-isolated-on-white-background-religious-architecture-facade-tall.jpg?s=612x612&w=0&k=20&c=cDtfqFVlfGyUV2qqTR4wzS_UDzpGOQa-XMuWF6kMbXs=",
    },
    {
      title: "Feira Criativa Aurora",
      date: "Hoje, 10h",
      location: "Florianópolis - SC",
      priceRange: "Entrada gratuita",
      image: "https://media.istockphoto.com/id/1473077427/pt/vetorial/catholic-church-building-isolated-on-white-background-religious-architecture-facade-tall.jpg?s=612x612&w=0&k=20&c=cDtfqFVlfGyUV2qqTR4wzS_UDzpGOQa-XMuWF6kMbXs=",
    },
    {
      title: "Jogos Universitários",
      date: "Hoje, 16h",
      location: "São José dos Campos - SP",
      priceRange: "A partir de R$ 25",
      image: "https://media.istockphoto.com/id/1473077427/pt/vetorial/catholic-church-building-isolated-on-white-background-religious-architecture-facade-tall.jpg?s=612x612&w=0&k=20&c=cDtfqFVlfGyUV2qqTR4wzS_UDzpGOQa-XMuWF6kMbXs=",
    },
    {
      title: "Oficina de Cerâmica",
      date: "Hoje, 18h",
      location: "Recife - PE",
      priceRange: "A partir de R$ 120",
      image: "https://media.istockphoto.com/id/1473077427/pt/vetorial/catholic-church-building-isolated-on-white-background-religious-architecture-facade-tall.jpg?s=612x612&w=0&k=20&c=cDtfqFVlfGyUV2qqTR4wzS_UDzpGOQa-XMuWF6kMbXs=",
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
