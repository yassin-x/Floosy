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

export default function Signin() {
  return (
    <main>
      <section className="container element-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>تسجيل الدخول</CardTitle>
            <CardDescription>
              ادخل بريدك الالكتروني لتسجيل الدخول
            </CardDescription>
            <CardAction>
              <Link
                href={`/${Routes.Auth}/${Pages.Signup}`}
                className={cn(buttonVariants({ variant: "glass" }))}
              >
                انضم إلينا
              </Link>
            </CardAction>
          </CardHeader>
          <Form />
        </Card>
      </section>
    </main>
  );
}
