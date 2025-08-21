import Link from "@/components/Link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pages, Routes } from "@/constants/enums";
import { cn } from "@/lib/utils";
import Form from "./_component/Form";

export default function Signup() {
  return (
    <main>
      <section className="container element-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>إنشاء حساب جديد</CardTitle>
            <CardDescription>
              انضم إلى فلوسي مجانًا وابدأ في متابعة أموالك بسهولة وأمان
            </CardDescription>
            <CardAction>
              <Link
                href={`/${Routes.Auth}/${Pages.Signin}`}
                className={cn(buttonVariants({ variant: "glass" }))}
              >
                تسجيل الدخول
              </Link>
            </CardAction>
          </CardHeader>
          <Form />
        </Card>
      </section>
    </main>
  );
}
