"use client";
import { User } from "@prisma/client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "../Link";
import { Pages, Routes } from "@/constants/enums";
import { Loader2 } from "lucide-react";

export default function Profile({
  user,
  isLoading,
}: {
  user: User;
  isLoading: boolean;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(buttonVariants({ variant: "glass" }))}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="animate-spin">
            <Loader2 />
          </span>
        ) : (
          user.username
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">فلوسي</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/${Routes.Dashboard}`}>لوحة التحكم</Link>
        </DropdownMenuItem>
        {!user.emailVerified && (
          <DropdownMenuItem>
            <Link href={`/${Pages.Verify}`}>تفعيل الحساب</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
        >
          الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
