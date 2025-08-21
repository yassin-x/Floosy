import React from "react";
import Form from "./Form";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "@/server/NextAuth";

export default async function AddExpense() {
  const initalSession = await getServerSession(NextAuthOptions)
  return (
    <section className="container">
      <div className="flex justify-between items-center">
        <h2 className="text-xl w-fit font-bold">إضافة مصاريف الشهرية</h2>
        <Form initalSession={initalSession} />
      </div>
    </section>
  );
}
