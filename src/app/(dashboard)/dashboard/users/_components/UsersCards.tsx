"use client";

import Link from "@/components/Link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pages, Routes } from "@/constants/enums";
import { cn } from "@/lib/utils";
import { Roles, User } from "@prisma/client";
import { KeyIcon, UserIcon } from "lucide-react";
import React from "react";

export default function UsersCards({ users }: { users: User[] }) {
  return (
    <section className="container py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card
            key={user.userId}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{user.username}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
                <CardAction>
                  <Link
                    href={`/${Routes.Dashboard}/${Pages.Users}/${user.userId}`}
                    className={cn(
                      buttonVariants({ variant: "glass", size: "sm" })
                    )}
                  >
                    عرض
                  </Link>
                </CardAction>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {user.role === Roles.ADMIN ? "إداري" : "مستخدم"}
                </span>
                {user.role === Roles.ADMIN ? (
                  <KeyIcon className="size-4 text-muted-foreground" />
                ) : (
                  <UserIcon className="size-4 text-muted-foreground" />
                )}
              </div>
            </CardContent>

            <CardFooter className="pt-3 border-t">
              <CardDescription>
                آخر تسجيل دخول:{" "}
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })
                  : "—"}
              </CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
