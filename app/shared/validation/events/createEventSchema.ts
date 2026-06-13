import { z } from "zod";

export const eventCategories = ["Congresso", "Culto", "Acampamento", "Show", "Palestra"] as const;
export const eventCategoryEnum = z.enum(eventCategories);

const bannerSchema = z
  .custom<File | undefined>(
    (file) => typeof File === "undefined" || file === undefined || file instanceof File,
    { message: "Envie uma imagem JPEG ou PNG." }
  )
  .refine((file) => !!file, "Envie uma imagem JPEG ou PNG.")
  .refine((file) => !file || file.size <= 2 * 1024 * 1024, "O arquivo deve ter no máximo 2MB.");

const ticketSchema = z.object({
  title: z.string().min(1, "Informe o título do ingresso."),
  quantity: z.number().int().positive("Quantidade deve ser maior que zero."),
  netValue: z.number().positive("Informe um valor maior que zero."),
  buyerValue: z.number().positive(),
  salePeriodType: z.enum(["date", "batch"]),
  saleStartDate: z.string().min(1, "Informe a data de início das vendas."),
  saleStartTime: z.string().min(1, "Informe a hora de início das vendas."),
  saleEndDate: z.string().min(1, "Informe a data de término das vendas."),
  saleEndTime: z.string().min(1, "Informe a hora de término das vendas."),
  minPerPurchase: z.number().int().positive("Mínimo deve ser maior que zero."),
  maxPerPurchase: z.number().int().positive("Máximo deve ser maior que zero."),
  hasHalfPrice: z.boolean().default(false),
  halfPriceValue: z.number().nullable().optional(),
  halfPriceQuantity: z.number().int().nullable().optional(),
});

export const createEventSchema = z
  .object({
    eventType: z.enum(["presencial", "online"]),
    name: z
      .string()
      .min(3, "Nome muito curto.")
      .max(100, "Nome pode ter no máximo 100 caracteres."),
    banner: bannerSchema,
    category: eventCategoryEnum,
    startDate: z.string().min(1, "Informe a data de início."),
    startTime: z.string().min(1, "Informe a hora de início."),
    endDate: z.string().min(1, "Informe a data de término."),
    endTime: z.string().min(1, "Informe a hora de término."),
    description: z
      .string()
      .min(10, "Descrição muito curta.")
      .max(8000, "Descrição muito longa."),
    venue: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    isVenueToBeDefined: z.boolean().default(false),
    tickets: z.array(ticketSchema).min(1, "Cadastre pelo menos um ingresso."),
    termsAccepted: z.coerce
      .boolean()
      .refine((val) => val === true, { message: "Você precisa aceitar os termos para publicar." }),
  })
  .refine(
    (data) => {
      const start = new Date(`${data.startDate}T${data.startTime}`);
      const end = new Date(`${data.endDate}T${data.endTime}`);
      return start < end;
    },
    {
      message: "Data/hora de término deve ser depois da data/hora de início.",
      path: ["endDate"],
    }
  )
  .superRefine((data, ctx) => {
    if (data.eventType === "presencial" && !data.isVenueToBeDefined) {
      if (!data.venue || data.venue.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Informe o local do evento.",
          path: ["venue"],
        });
      }
      if (!data.city || data.city.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Informe a cidade.",
          path: ["city"],
        });
      }
      if (!data.state || data.state.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Informe o estado.",
          path: ["state"],
        });
      }
    }
  });

export type CreateEventFormValues = z.input<typeof createEventSchema>;
export type CreateTicketInput = z.infer<typeof ticketSchema>;
