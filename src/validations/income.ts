import { IncomeType } from "@prisma/client";
import z from "zod";

export const incomeSchema = () => {
  return z.object({
    userId: z.string(),
    amount: z.string().min(1, { message: "الكمية يجب ان تكون اكبر من 1" }),
    description: z.string().optional(),
    source: z.enum(IncomeType),
  });
};
