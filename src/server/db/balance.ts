import { db } from "@/lib/prisma";

export const getBalance = async ({ userId }: { userId: string }) => {
  const balance = await db.balance.findUnique({
    where: {
      userId,
    },
  });

  return balance;
};
