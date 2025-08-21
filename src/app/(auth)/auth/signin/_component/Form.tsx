"use client";
import FormFields from "@/components/FormFields";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useRef, useState } from "react";
import { toast } from "sonner";

export default function Form() {
  const { getFormFields } = useFormFields({
    slug: Pages.Signin,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsLoading(true);
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationError;
        setError(validationError);
        const responseError = JSON.parse(res?.error).responoseError;
        if (responseError) {
          toast(responseError, { className: "text-red-400" });
        }
      }

      if (res?.ok) {
        toast("تم تسجيل الدخول بنجاح", { className: "text-green-400" });
        router.replace(`/${Pages.Verify}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <CardContent className="space-y-4">
        {getFormFields().map((field: IFormField) => (
          <Fragment key={field.name}>
            <FormFields {...field} error={error} />
          </Fragment>
        ))}
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-4">
        <Button
          type="submit"
          className="w-full"
          variant={"glass"}
          disabled={isLoading}
        >
          تسجيل الدخول
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => toast("قريبا سيتم اضافتة")}
        >
          تسجيل الدخول باستخدام جوجل
        </Button>
      </CardFooter>
    </form>
  );
}
