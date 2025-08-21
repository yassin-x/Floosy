"use server";

import generateFloosyId from "@/lib/floosyId";
import { db } from "@/lib/prisma";
import { initialState, ValidationErrors } from "@/types/app";
import { signInSchema, signUpSchema } from "@/validations/auth";
import bcrypt from "bcryptjs";
import * as z from "zod";
import axios from "axios";
import { sendEmail } from "@/lib/sendEmail";
import { revalidatePath } from "next/cache";
import { Pages, Routes } from "@/constants/enums";

export const signIn = async (
  credentials: Record<"password" | "email", string> | undefined
) => {
  const result = signInSchema().safeParse(credentials);
  if (result.success === false) {
    const flattened = z.flattenError(result.error);
    return {
      error: flattened.fieldErrors,
      status: 400,
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (!user) {
      return {
        status: 404,
        message: "المستخدم غير موجود",
      };
    }

    const isPasswordValid = await bcrypt.compare(
      result.data.password,
      user.password
    );

    if (!isPasswordValid) {
      return {
        status: 500,
        message: "كلمة المرور غير صحيحة",
      };
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    revalidatePath(`/${Routes.Dashboard}/${Pages.Users}`);

    return {
      status: 200,
      message: "تم تسجيل الدخول بنجاح",
      user: {
        ...user,
        password: undefined,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export const signUp = async (
  prevState: unknown,
  formData: FormData
): Promise<typeof initialState> => {
  const result = signUpSchema().safeParse(
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
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (user) {
      return {
        status: 409,
        message: "المستخدم موجود بالفعل",
      };
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const digitalCode = Math.floor(100000 + Math.random() * 900000); // 6 digits
    const userId = generateFloosyId();
    await db.user.create({
      data: {
        userId,
        email: result.data.email,
        password: hashedPassword,
        username: result.data.username,
        emailVerified: false,
        emailCodeVerified: digitalCode.toString(),
        lastLogin: new Date(),
      },
    });

    await sendEmail({
      email: result.data.email,
      subject: "فلوسي | كود التحقق من الحساب",
      template: "confirmEmail",
      data: { validationCode: digitalCode.toString() },
    });

    revalidatePath(`/${Routes.Dashboard}/${Pages.Users}`);
    return {
      status: 200,
      message: "تم التسجيل بنجاح",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export const resendVerificationEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user?.emailVerified) {
      return {
        status: 400,
        message: "البريد الالكتروني مفعل بالفعل",
      };
    }

    const digitalCode = Math.floor(100000 + Math.random() * 900000);
    await db.user.update({
      where: {
        email,
      },
      data: {
        emailCodeVerified: digitalCode.toString(),
      },
    });
    await sendEmail({
      email,
      subject: "فلوسي | كود التحقق من الحساب",
      template: "confirmEmail",
      data: { validationCode: digitalCode.toString() },
    });

    return {
      status: 200,
      message: "تم اعادة ارسال كود التحقق بنجاح",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export const verifiedEmailCode = async (email: string, code: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user?.emailCodeVerified === code) {
      await db.user.update({
        where: {
          email,
        },
        data: {
          emailVerified: true,
          emailCodeVerified: null,
        },
      });

      revalidatePath(`/${Routes.Dashboard}/${Pages.Users}`);

      return {
        status: 200,
        message: "تم التحقق من البريد الالكتروني بنجاح",
      };
    }

    return {
      status: 400,
      message: "الكود غير صحيح",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
