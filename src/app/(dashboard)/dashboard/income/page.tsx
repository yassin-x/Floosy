import { Separator } from "@/components/ui/separator";
import React from "react";
import { NextAuthOptions } from "@/server/NextAuth";
import { getServerSession } from "next-auth";
import AddIncome from "./_components/AddIncome";
import AllIncome from "./_components/AllIncome";
import { getIncome } from "@/server/db/income";

export default async function page() {
  const session = await getServerSession(NextAuthOptions);
  const income = await getIncome(session?.user.userId as string);
  return (
    <main>
      <h2 className="heading-color text-center w-fit mx-auto text-2xl font-bold">
        دخلك يخويا
      </h2>
      <div className="my-6 md:my-12">
        <Separator className="w-full" />
      </div>
      <AddIncome />
      <AllIncome income={income} />
    </main>
  );
}
