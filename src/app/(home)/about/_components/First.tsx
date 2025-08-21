import Link from "@/components/Link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function First() {
  return (
    <section className="section-gap container">
      <div className="flex items-center justify-center lg:justify-between">
        <div className="max-w-md flex items-center flex-col gap-4 mx-auto">
          <h1 className="heading-color text-3xl text-center">
            فلوسي، هيا الحل لمتابعة مصاريفك
          </h1>
          <p className="text-muted-foreground text-center select-none">
            كل ما تحتاجه لتتبع مصاريفك وإدارة ميزانيتك في مكان واحد. ابدأ الآن واستمتع بتجربة سهلة وممتعة ومجانية.
          </p>
        </div>
      </div>
    </section>
  );
}
