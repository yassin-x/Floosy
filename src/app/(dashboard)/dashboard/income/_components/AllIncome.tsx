"use client";
import { Expense, Income } from "@prisma/client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { formatDate } from "date-fns";
import { deleteIncome } from "../_actions/income";

export default function AllIncome({ income }: { income: Income[] }) {
  const handleDelete = async (expenseId: string) => {
    const res = await deleteIncome(expenseId);
  };

  return (
    <section className="container section-gap">
      <div className="gird grid-cols-1 w-full space-y-4">
        {income.length > 0 &&
          income.map((income) => (
            <div
              key={income.id}
              className="flex justify-between items-center border-b "
            >
              <div className=" p-2 flex items-start flex-col">
                <p className="text-md font-bold heading-color w-fit">
                  المبلغ : {income.amount}
                </p>
                <p className="text-sm text-muted-foreground">
                  المصدر : {income.source}
                </p>
                <p className="text-sm text-muted-foreground">
                  {income.description}
                </p>
              </div>
              <div className="flex items-end flex-col gap-3">
                <Button
                  onClick={() => handleDelete(income.id)}
                  variant={"glass"}
                >
                  <Trash />
                </Button>
                <p
                  suppressHydrationWarning
                  className="text-sm text-muted-foreground"
                >
                  {new Date(income.date).toLocaleDateString("en-EG", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
