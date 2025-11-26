"use client";

import { EventsSection, EventCardInfo } from "./EventsSection";

export function TodaysEvents() {
  const events: EventCardInfo[] = [
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
