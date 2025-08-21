"use server";

import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getExpenses = cache(
  async (userId: string) => {
    const expenses = await db.expense.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!expenses) return [];
    return expenses;
  },
  ["all-expenses"],
  {
    revalidate: 3600,
  }
);
