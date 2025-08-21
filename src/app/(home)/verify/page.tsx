import { getServerSession } from "next-auth";
import CardForm from "./_components/CardForm";
import { NextAuthOptions } from "@/server/NextAuth";

export default async function Verify() {
  const initialSession = await getServerSession(NextAuthOptions);
  return (
    <main>
      <CardForm initialSession={initialSession} />
    </main>
  );
}
