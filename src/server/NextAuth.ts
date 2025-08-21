import { Environments, Pages, Routes } from "@/constants/enums";
import { Currency, Roles, Status, User } from "@prisma/client";
import { AuthOptions, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signIn } from "./actions/Auth";
import { JWT } from "next-auth/jwt";
import { db } from "@/lib/prisma";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Partial<User> {
    id: string;
    userId: string;
    email: string;
    username: string;
    avatarUrl?: string;
    emailCodeVerified?: string;
    emailVerified: boolean;
    status: Status;
    role: Roles;
    currency: Currency;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
  }
}

export const NextAuthOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      authorize: async (credentials) => {
        const res = await signIn(credentials);
        if (res.status === 200 && res.user) {
          return res.user;
        } else {
          throw new Error(
            JSON.stringify({
              validationError: res.error,
              responoseError: res.message,
            })
          );
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 4 * 24 * 60 * 60, // 4 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === Environments.Dev,
  pages: {
    signIn: `/${Routes.Auth}/${Pages.Signin}`,
    error: `/`,
  },

  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.avatarUrl = token.avatarUrl ?? null;
        session.user.emailCodeVerified = token.emailCodeVerified ?? null;
        session.user.emailVerified = token.emailVerified;
        session.user.status = token.status;
        session.user.role = token.role;
        session.user.currency = token.currency;
        session.user.lastLogin = token.lastLogin;
        session.user.createdAt = token.createdAt;
        session.user.updatedAt = token.updatedAt;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          userId: token.userId,
          email: token.email,
          username: token.username,
          avatarUrl: token.avatarUrl ?? null,
          emailCodeVerified: token.emailCodeVerified ?? null,
          emailVerified: token.emailVerified,
          status: token.status,
          role: token.role,
          currency: token.currency,
          lastLogin: token.lastLogin,
          createdAt: token.createdAt,
          updatedAt: token.updatedAt,
        },
      };
    },
    jwt: async ({ token }): Promise<JWT> => {
      const user = await db.user.findUnique({
        where: {
          email: token.email,
        },
      });
      if (!user) {
        return token;
      }
      return {
        id: user.id,
        userId: user.userId,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl ?? undefined,
        emailCodeVerified: user.emailCodeVerified ?? undefined,
        emailVerified: user.emailVerified,
        status: user.status,
        role: user.role,
        currency: user.currency,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    },
  },
};
