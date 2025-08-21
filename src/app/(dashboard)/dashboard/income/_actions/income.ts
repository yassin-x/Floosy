"use server";

import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { incomeSchema } from "@/validations/income";
import { revalidatePath } from "next/cache";
import z from "zod";

export const addIncome = async (prevState: unknown, formData: FormData) => {
  const result = incomeSchema().safeParse(
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
    await db.income.create({
      data: {
        amount: Number(result.data.amount),
        description: result.data.description,
        source: result.data.source,
        userId: result.data.userId,
      },
    });

    revalidatePath(`/${Routes.Dashboard}`);
    revalidatePath(`/${Routes.Dashboard}/${Pages.Income}`);

    return {
      status: 200,
      message: "تم إضافة الدخل بنجاح",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export const deleteIncome = async (incomeId: string) => {
  try {
    await db.income.delete({
      where: {
        id: incomeId,
      },
    });
    revalidatePath(`/${Routes.Dashboard}`);
    revalidatePath(`/${Routes.Dashboard}/${Pages.Income}`);
    return {
      status: 200,
      message: "تم حذف الدخل بنجاح",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
