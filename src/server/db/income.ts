import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getIncome = cache(
  async (userId: string) => {
    const income = await db.income.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return income;
  },
  ["all-income"],
  {
    revalidate: 3600,
  }
);
