import { NextAuthOptions } from "@/server/NextAuth";
import NextAuth from "next-auth";

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
