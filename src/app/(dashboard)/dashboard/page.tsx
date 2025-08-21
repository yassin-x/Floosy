import React from "react";
import Info from "./_components/Info";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "@/server/NextAuth";
import { getUserInfo } from "@/server/db/user";
import { Separator } from "@/components/ui/separator";

export default async function page() {
  const session = await getServerSession(NextAuthOptions);
  const userData = await getUserInfo(session?.user.userId as string);
  return (
    <main>
      <Info user={userData} />
      <div className="my-8 md:my-16">
        <Separator className="w-full" />
      </div>
      <section>
        <h2 className="heading-color text-center w-fit mx-auto text-2xl font-bold">
          مرحبا بك في لوحة التحكم
        </h2>
        <p className="text-center text-muted-foreground mt-4">
          هنا يمكنك إدارة دخلك ومصاريفك الشهرية بكل سهولة ويسر.
        </p>
        <p className="text-center text-muted-foreground mt-2">
          استمتع بتجربة إدارة مالية سلسة وفعالة.
        </p>
        <p className="text-center text-muted-foreground mt-2">
          إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا.
        </p>
      </section>
    </main>
  );
}
