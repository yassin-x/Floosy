"use client";
import FormFields from "@/components/FormFields";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pages } from "@/constants/enums";
import { useClientSession } from "@/hooks/useClientSession";
import useFormFields from "@/hooks/useFormFields";
import { Session } from "next-auth";
import React, { useActionState, useEffect } from "react";
import { initialState } from "@/types/app";
import { toast } from "sonner";
import { addIncome } from "../_actions/income";

export default function Form({
  initalSession,
}: {
  initalSession: Session | null;
}) {
  const { getFormFields } = useFormFields({ slug: Pages.Income });
  const session = useClientSession(initalSession);
  const [state, action, pending] = useActionState(addIncome, initialState);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (state.status === 200) {
      toast(state.message);
      setOpen(false);
    } else {
      if (!state.message) return;
      toast(state.message, { duration: 5000 });
    }
  }, [state.message, state.status]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="glass">إضافة مصاريف</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="">
          <DialogTitle>إضافة مصاريف</DialogTitle>
          <DialogDescription>إضافة مصاريف جديدة</DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4">
            {getFormFields(session?.data?.user?.userId as string).map(
              (field) => (
                <div key={field.name} className="grid gap-2">
                  <FormFields {...field} error={{}} />
                </div>
              )
            )}
            <Button type="submit" disabled={pending}>
              حفظ التغييرات
            </Button>
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={pending}>
              الغاء
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
