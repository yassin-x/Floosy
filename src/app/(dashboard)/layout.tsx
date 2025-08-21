import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import SidebarApp from "./_components/Sidebar";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "@/server/NextAuth";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialSession = await getServerSession(NextAuthOptions);
  return (
    <SidebarProvider>
      <SidebarApp initialSession={initialSession} />
      <SidebarInset className="w-full">
        <header className="flex rounded-t-full! h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
