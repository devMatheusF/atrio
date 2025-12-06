"use client";

import { EventsSection, EventCardInfo } from "./EventsSection";

export function MostPurchasedEvents() {
  const events: EventCardInfo[] = [
    {
      title: "Festival Ritmos do Sul",
      date: "Hoje, 22h",
      location: "Curitiba - PR",
      priceRange: "A partir de R$ 95",
      image: "https://media.istockphoto.com/id/1473077427/pt/vetorial/catholic-church-building-isolated-on-white-background-religious-architecture-facade-tall.jpg?s=612x612&w=0&k=20&c=cDtfqFVlfGyUV2qqTR4wzS_UDzpGOQa-XMuWF6kMbXs=",
    },
    {
      title: "Workshop de Marketing Digital",
      date: "Amanhã, 19h",
      location: "Online",
      priceRange: "A partir de R$ 59",
      image: "https://media.istockphoto.com/id/1473077427/pt/vetorial/catholic-church-building-isolated-on-white-background-religious-architecture-facade-tall.jpg?s=612x612&w=0&k=20&c=cDtfqFVlfGyUV2qqTR4wzS_UDzpGOQa-XMuWF6kMbXs=",
    },
    {
      title: "Passeio Gastronômico",
      date: "23 Nov, 12h",
      location: "São Paulo - SP",
      priceRange: "A partir de R$ 180",
      image: "https://media.istockphoto.com/id/1473077427/pt/vetorial/catholic-church-building-isolated-on-white-background-religious-architecture-facade-tall.jpg?s=612x612&w=0&k=20&c=cDtfqFVlfGyUV2qqTR4wzS_UDzpGOQa-XMuWF6kMbXs=",
    },
    {
      title: "Corrida Noturna da Lagoa",
      date: "25 Nov, 20h",
      location: "Rio de Janeiro - RJ",
      priceRange: "A partir de R$ 75",
      image: "https://media.istockphoto.com/id/1473077427/pt/vetorial/catholic-church-building-isolated-on-white-background-religious-architecture-facade-tall.jpg?s=612x612&w=0&k=20&c=cDtfqFVlfGyUV2qqTR4wzS_UDzpGOQa-XMuWF6kMbXs=",
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
