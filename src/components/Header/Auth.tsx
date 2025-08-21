"use client";
import { Session } from "next-auth";
import React from "react";
import Link from "../Link";
import { Pages, Routes } from "@/constants/enums";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { useClientSession } from "@/hooks/useClientSession";
import Profile from "./Profile";

export default function Auth({
  initialSession,
}: {
  initialSession: Session | null;
}) {
  const session = useClientSession(initialSession);
  const isLoading = session.status === "loading";
  return (
    <div>
      {session.data?.user ? (
        <Profile user={session.data.user} isLoading={isLoading} />
      ) : (
        <Link
          href={`/${Routes.Auth}/${Pages.Signin}`}
          className={cn(buttonVariants({ variant: "glass" }))}
        >
          تسجيل دخول
        </Link>
      )}
    </div>
  );
}
