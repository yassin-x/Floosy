"use server";

import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getUsers = cache(
  async () => {
    const users = await db.user.findMany({
      include: {
        balance: true,
        Income: true,
        Expense: true,
      },
    });
    return users;
  },
  ["all-users"],
  {
    revalidate: 3600,
  }
);

export const getUserInfo = cache(
  async (userId: string) => {
    const user = await db.user.findUnique({
      where: {
        userId,
      },
      include: {
        balance: true,
        Income: true,
        Expense: true,
      },
    });
    return user;
  },
  [`user-${crypto.randomUUID()}`],
  {
    revalidate: 3600,
  }
);
