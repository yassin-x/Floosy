import { PaymentType } from "@prisma/client";
import z from "zod";

export const expenseSchema = () => {
  return z.object({
    userId: z.string(),
    amount: z.string().min(1, { message: "الكمية يجب ان تكون اكبر من 1" }),
    description: z.string().optional(),
    paymentType: z.enum(PaymentType),
  });
};
