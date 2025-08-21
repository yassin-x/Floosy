import { Separator } from "@/components/ui/separator";
import React from "react";
import SomeInfo from "./_components/SomeInfo";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "@/server/NextAuth";

export default async function page() {
  const initialSession = await getServerSession(NextAuthOptions);
  return (
    <main>
      <h2 className="heading-color text-center w-fit mx-auto text-2xl font-bold">
        ملفك الشخصي عزيزي المتابع
      </h2>
      <div className="my-6 md:my-12">
        <Separator className="w-full" />
      </div>
      <SomeInfo initialSession={initialSession} />
    </main>
  );
}
