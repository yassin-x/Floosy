"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Balance, User } from "@prisma/client";
import React from "react";
interface UserProps {
  user: User & { balance: Balance };
}
export default function Info({ user }: UserProps) {
  console.log(user);
  return (
    <section className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>رصيدك كاش</CardTitle>
            <CardDescription>رصيدك المتبقي بعد مصاريفك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-center">
                {user.balance ? user.balance.cash : 0}{" "}
                <span className="text-sm text-muted-foreground">قريبا</span>
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>رصيدك البنك</CardTitle>
            <CardDescription>رصيدك المتبقي بعد مصاريفك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-center">
                {user.balance ? user.balance.bank : 0}{" "}
                <span className="text-sm text-muted-foreground">قريبا</span>
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>رصيدك المحفظة</CardTitle>
            <CardDescription>رصيدك المتبقي بعد مصاريفك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-center">
                {user.balance ? user.balance.wallet : 0}{" "}
                <span className="text-sm text-muted-foreground">قريبا</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
