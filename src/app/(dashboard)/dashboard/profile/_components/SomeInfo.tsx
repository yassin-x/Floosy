"use client";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function SomeInfo({
  initialSession,
}: {
  initialSession: Session | null;
}) {
  const session = useClientSession(initialSession);
  const [copied, setCopied] = useState(false);

  const userId = session?.data?.user.userId;
  const email = session?.data?.user.email;
  const lastLogin = session?.data?.user.lastLogin;

  const handleCopy = async () => {
    if (userId) {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="container">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>
            أهلا بك {session?.data?.user.username || "عزيزي المتابع"}
          </CardTitle>
          <CardDescription>{session?.data?.user.userId}</CardDescription>
          <CardAction>
            <Button variant="glass" onClick={handleCopy}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <CardDescription className="heading-color w-fit">
            البريد الالكتروني :
          </CardDescription>
          <CardDescription>{email}</CardDescription>
        </CardContent>
        <CardFooter>
          <CardDescription>
            <span className="heading-color">آخر تسجيل دخول :</span> {" "}
            {lastLogin
              ? new Date(lastLogin).toLocaleString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "غير متوفر"}
          </CardDescription>
        </CardFooter>
      </Card>
    </section>
  );
}
