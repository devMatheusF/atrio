import { DashboardPageClient } from "@/app/components/dashboard/DashboardPageClient";
import type { DashboardState } from "@/app/store/dashboardStore";

export default async function DashboardPage() {
  const mockDashboardData: DashboardState = {
    eventTitle: "Aniversário do bebet0",
    eventDateRange: "Domingo, 07/12/2025, 00h30 – Terça-feira, 09/12/2025, 00h30",
    eventLocation: "Local a definir, Valinhos, SP",
    lastUpdatedAt: "17/12/2025 22:28",
    countdownStatus: "ended",
    filters: {
      period: "last_30_days",
      ticketsType: "all",
    },
    metrics: {
      netSales: 0,
      approvedTickets: 0,
      freeTickets: 0,
      paidTickets: 0,
      averageTicket: 0,
    },
    salesSeries: [],
  };

  return <DashboardPageClient initialState={mockDashboardData} />;
}

