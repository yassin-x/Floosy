import { Separator } from "@/components/ui/separator";
import React from "react";
import AddExpense from "./_components/Add";
import AllExpenses from "./_components/AllExpenses";
import { NextAuthOptions } from "@/server/NextAuth";
import { getServerSession } from "next-auth";
import { getExpenses } from "@/server/db/expense";

export default async function page() {
  const session = await getServerSession(NextAuthOptions);
  const expenses = await getExpenses(session?.user.userId as string);
  return (
    <main>
      <h2 className="heading-color text-center w-fit mx-auto text-2xl font-bold">
        مصاريفك يخويا
      </h2>
      <div className="my-6 md:my-12">
        <Separator className="w-full" />
      </div>
      <AddExpense />
      <AllExpenses expenses={expenses} />
    </main>
  );
}
