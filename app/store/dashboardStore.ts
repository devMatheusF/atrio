"use client";

import { create } from "zustand";
import type { ReactNode } from "react";

export type DashboardFilters = {
  period: "last_30_days" | "custom";
  ticketsType: "all" | "paid" | "free";
};

export type DashboardMetricCard = {
  title: string;
  value: string | number;
  helperText?: string;
  icon?: ReactNode;
};

export type DashboardSalesPoint = {
  date: string; // ISO date
  salesAmount: number; // cents or number
  ticketsQuantity: number;
};

export type DashboardState = {
  eventTitle: string;
  eventDateRange: string;
  eventLocation: string;
  lastUpdatedAt: string;
  countdownStatus: "active" | "ended";
  filters: DashboardFilters;
  metrics: {
    netSales: number;
    approvedTickets: number;
    freeTickets: number;
    paidTickets: number;
    averageTicket: number;
  };
  salesSeries: DashboardSalesPoint[];
};

type DashboardActions = {
  setFilters: (partial: Partial<DashboardFilters>) => void;
  setSalesSeries: (data: DashboardSalesPoint[]) => void;
  hydrateFromServer: (initial: DashboardState) => void;
};

export type DashboardStore = {
  state: DashboardState;
} & DashboardActions;

const DEFAULT_STATE: DashboardState = {
  eventTitle: "",
  eventDateRange: "",
  eventLocation: "",
  lastUpdatedAt: "",
  countdownStatus: "active",
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

export const useDashboardStore = create<DashboardStore>()((set) => ({
  state: DEFAULT_STATE,
  setFilters: (partial) =>
    set((current) => ({
      state: {
        ...current.state,
        filters: {
          ...current.state.filters,
          ...partial,
        },
      },
    })),
  setSalesSeries: (data) =>
    set((current) => ({
      state: {
        ...current.state,
        salesSeries: data,
      },
    })),
  hydrateFromServer: (initial) => set({ state: initial }),
}));
