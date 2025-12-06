import { z } from "zod";

export const myEventsFiltersSchema = z.object({
  search: z
    .string()
    .trim()
    .max(120, "Use no máximo 120 caracteres.")
    .optional()
    .default(""),
  status: z
    .union([z.literal("published"), z.literal("closed"), z.literal("")])
    .optional()
    .default(""),
});

export type MyEventsFiltersValues = z.infer<typeof myEventsFiltersSchema>;
