"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import Link from "@/components/Link";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";
import {
  resendVerificationEmail,
  verifiedEmailCode,
} from "@/server/actions/Auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CardForm({
  initialSession,
}: {
  initialSession: Session | null;
}) {
  const session = useClientSession(initialSession);
  const [code, setCode] = React.useState("");
  const [cooldown, setCooldown] = React.useState(0);
  const router = useRouter();
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (!session?.data?.user?.email) return;
    const res = await resendVerificationEmail(session.data.user.email);
    toast(res.message);
    setCooldown(30);
  };

  const handleVerify = async () => {
    if (!session?.data?.user?.email) return;
    const res = await verifiedEmailCode(session.data.user.email, code);
    toast(res.message);
    if (res.status === 200) {
      router.replace(`/`);
    }
  };

  return (
    <section className="container element-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>مرحبا {session?.data?.user?.username}</CardTitle>
          <CardDescription>الرجاء التحقق من بريدك الالكتروني</CardDescription>
          <CardAction>
            <Button
              onClick={handleResend}
              variant={"glass"}
              disabled={cooldown > 0}
            >
              {cooldown > 0 ? `(${cooldown} ثانية)` : "اعادة الارسال"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <InputOTP
            maxLength={6}
            dir={"auto"}
            value={code}
            onChange={(value) => setCode(value)}
          >
            <InputOTPGroup dir={"auto"}>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup dir={"auto"}>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter>
          <Button variant={"glass"} className="w-full" onClick={handleVerify}>
            التحقق
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
