"use client";
import { Expense } from "@prisma/client";
import React from "react";
import { deleteExpense } from "../_actions/expense";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { formatDate } from "date-fns";

export default function AllExpenses({ expenses }: { expenses: Expense[] }) {
  const handleDelete = async (expenseId: string) => {
    const res = await deleteExpense(expenseId);
  };

  return (
    <section className="container section-gap">
      <div className="gird grid-cols-1 w-full space-y-4">
        {expenses.length > 0 &&
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex justify-between items-center border-b "
            >
              <div className=" p-2 flex items-start flex-col">
                <p className="text-md font-bold heading-color w-fit">
                  المبلغ المدفوع : {expense.amount}
                </p>
                <p className="text-sm text-muted-foreground">
                  طريقة الدفع : {expense.paymentType}
                </p>
                <p className="text-sm text-muted-foreground">
                  {expense.description}
                </p>
              </div>
              <div className="flex items-end flex-col gap-3">
                <Button
                  onClick={() => handleDelete(expense.id)}
                  variant={"glass"}
                >
                  <Trash />
                </Button>
                <p
                  suppressHydrationWarning
                  className="text-sm text-muted-foreground"
                >
                  {new Date(expense.date).toLocaleDateString("en-EG", {
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
