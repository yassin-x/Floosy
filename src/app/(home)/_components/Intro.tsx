import Link from "@/components/Link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Intro() {
  return (
    <section className="section-gap container">
      <div className="flex items-center justify-center lg:justify-between">
        <div className="max-w-md flex items-center lg:items-start flex-col gap-4 mx-auto">
          <h1 className="heading-color text-3xl text-center lg:text-start">
            مع فلوسي، كل جنيه تعرف راح فين
          </h1>
          <p className="text-muted-foreground text-center lg:text-start select-none">
            مع فلوسي، راقب مصاريفك، خطط ميزانيتك، وخلي أموالك تحت السيطرة بكل
            سهولة وفي أي وقت.
          </p>
          <div className="w-full">
            <Link
              href={`/${Routes.Auth}/${Pages.Signin}`}
              className={cn(
                "w-full lg:w-auto",
                buttonVariants({ variant: "glass" })
              )}
            >
              ابداء الان
            </Link>
          </div>
        </div>
        <div className="hidden lg:block rounded-lg overflow-hidden border p-2 shadow-md mx-auto relative">
          <div className="absolute inset-0 bg-black/20 blur-md shadow-lg hover:bg-black/30 -z-50" />
          <Image
            src={"/sections/intro.png"}
            alt="intro"
            width={500}
            height={500}
            className="object-cover select-none"
            priority
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
