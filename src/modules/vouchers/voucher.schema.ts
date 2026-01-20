import { z } from "zod";

export const CreateVoucherSchema = z.object({
  body: z
    .object({
      code: z
        .string()
        .min(3)
        .max(20)
        .regex(/^[A-Z0-9]+$/),

      name: z.string().min(3, {
        message: "Voucher name must be filled with at least 3 letters",
      }),

      stock: z
        .number({ message: "Stock must be in number type" })
        .int({ message: "Stock can't be decimal" })
        .min(1, { message: "Stock at least one" }),

      valid_from: z
        .string()
        .datetime({ message: "Use ISO 8601 datetime format" }),
      valid_until: z
        .string()
        .datetime({ message: "Use ISO 8601 datetime format" }),
    })
    .refine((data) => new Date(data.valid_until) > new Date(data.valid_from), {
      message: "End date can't be earlier from Start date",
      // path: ["valid_until"]
    }),
});

export type CreateVoucherDTO = z.infer<typeof CreateVoucherSchema>["body"];
