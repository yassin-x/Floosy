import React from "react";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "@/server/NextAuth";
import Form from "./Form";

export default async function AddExpense() {
  const initalSession = await getServerSession(NextAuthOptions)
  return (
    <section className="container">
      <div className="flex justify-between items-center">
        <h2 className="text-xl w-fit font-bold">إضافة دخل</h2>
        <Form initalSession={initalSession} />
      </div>
    </section>
  );
}
