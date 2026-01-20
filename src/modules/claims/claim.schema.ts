import { z } from "zod";

export const ClaimVoucherSchema = z.object({
  params: z.object({
    id: z.coerce
      .number({ message: "Voucher ID must be number" })
      .int()
      .positive({ message: "Voucher ID must be positive number" }),
  }),
});

export type ClaimVoucherParams = z.infer<typeof ClaimVoucherSchema>["params"];
