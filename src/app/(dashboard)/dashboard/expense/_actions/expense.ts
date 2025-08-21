"use server";

import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { expenseSchema } from "@/validations/expense";
import { revalidatePath } from "next/cache";
import z from "zod";

export const addExpense = async (prevState: unknown, formData: FormData) => {
  const result = expenseSchema().safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    const flattened = z.flattenError(result.error);
    return {
      error: flattened.fieldErrors,
      status: 400,
      formData,
    };
  }

  try {
    await db.expense.create({
      data: {
        amount: Number(result.data.amount),
        description: result.data.description,
        paymentType: result.data.paymentType,
        userId: result.data.userId,
      },
    });

    revalidatePath(`/${Routes.Dashboard}`);
    revalidatePath(`/${Routes.Dashboard}/${Pages.Expense}`);
    return {
      status: 200,
      message: "تم إضافة المصروف بنجاح",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export const deleteExpense = async (expenseId: string) => {
  try {
    await db.expense.delete({
      where: {
        id: expenseId,
      },
    });
    revalidatePath(`/${Routes.Dashboard}`);
    revalidatePath(`/${Routes.Dashboard}/${Pages.Expense}`);
    return {
      status: 200,
      message: "تم حذف المصروف بنجاح",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
