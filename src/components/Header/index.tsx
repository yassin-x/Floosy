import React from "react";
import Link from "../Link";
import Image from "next/image";
import Nav from "./Nav";
import { getServerSession } from "next-auth";
import Auth from "./Auth";
import { NextAuthOptions } from "@/server/NextAuth";
import ThemeSwitcher from "./ThemeSwitcher";

export default async function Header() {
  const initialSession = await getServerSession(NextAuthOptions);
  return (
    <header className="p-2">
      <div className="container flex items-center justify-between">
        <Link href="/" className="select-none flex items-center gap-2">
          <Image
            src="/images/logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            priority
            loading="eager"
            className="rounded-full"
          />
          <span className="text-xl font-bold heading-color">فلوسي</span>
        </Link>
        <div className="hidden lg:block">
          <Nav />
        </div>
        <div className="flex items-center gap-2">
          <Auth initialSession={initialSession} />
          <div className="lg:hidden">
            <Nav />
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
