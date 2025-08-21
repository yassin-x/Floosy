"use client";

import FormFields from "@/components/FormFields";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { signUp } from "@/server/actions/Auth";
import { IFormField, initialState } from "@/types/app";
import { useRouter } from "next/navigation";
import React, { Fragment, useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function Form() {
  const { getFormFields } = useFormFields({
    slug: Pages.Signup,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(signUp, initialState);
  const router = useRouter();
  useEffect(() => {
    if (state.status === 200) {
      toast(state.message, { className: "text-green-400" });
      router.push(`/${Routes.Auth}/${Pages.Signin}`);
    } else {
      if (!state.message) return;
      toast(state.message, { className: "text-red-400" });
    }
  }, [state.message, state.status, router]);
  const reback = "test";
  return (
    <form ref={formRef} action={action}>
      <CardContent className="space-y-4">
        {getFormFields(reback).map((field: IFormField) => {
          const fieldValue = state.formData?.get(field.name) as string;
          return (
            <Fragment key={field.name}>
              <FormFields
                {...field}
                error={state.error}
                defaultValue={fieldValue}
              />
            </Fragment>
          );
        })}
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-4">
        <Button
          type="submit"
          className="w-full"
          variant={"glass"}
          disabled={pending}
        >
          انشاء حساب
        </Button>
      </CardFooter>
    </form>
  );
}
