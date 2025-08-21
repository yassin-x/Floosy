import { Routes } from "@/constants/enums";
import { NextAuthOptions } from "@/server/NextAuth";
import { Roles } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import UsersCards from "./_components/UsersCards";
import { getUsers } from "@/server/db/user";

export default async function page() {
  const initialSession = await getServerSession(NextAuthOptions);
  const users = await getUsers();
  if (initialSession?.user.role !== Roles.ADMIN) {
    redirect(`/${Routes.Dashboard}`);
  }
  return (
    <main>
      <UsersCards users={users} />
    </main>
  );
}
