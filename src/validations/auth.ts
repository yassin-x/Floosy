import * as z from "zod";

export const signInSchema = () => {
  return z.object({
    email: z.email({ message: "البريد الالكتروني غير صحيح" }),
    password: z
      .string()
      .min(6, { message: "كلمة المرور يجب ان تكون اقل من 6 احرف" }),
  });
};

export const signUpSchema = () => {
  return z
    .object({
      email: z.email({ message: "البريد الالكتروني غير صحيح" }),
      password: z
        .string()
        .min(6, { message: "كلمة المرور يجب ان تكون اقل من 6 احرف" }),
      confirmPassword: z.string().min(6, {
        message: "كلمة المرور يجب ان تكون اقل من 6 احرف",
      }),
      username: z
        .string()
        .min(3, { message: "الاسم يجب ان يكون اقل من 3 احرف" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "كلمة المرور غير متطابقة",
      path: ["confirmPassword"],
    });
};
