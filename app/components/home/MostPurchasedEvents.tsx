"use client";

import { EventsSection, EventCardInfo } from "./EventsSection";

export function MostPurchasedEvents() {
  const events: EventCardInfo[] = [
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
