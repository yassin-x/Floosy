"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Pages, Routes } from "@/constants/enums";
import {
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  User,
  SettingsIcon,
  Users,
} from "lucide-react";
import Link from "@/components/Link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { useClientSession } from "@/hooks/useClientSession";
import { Roles } from "@prisma/client";

export default function SidebarApp({
  initialSession,
}: {
  initialSession: Session | null;
}) {
  const pathname = usePathname();
  const mainNav = [
    {
      title: "الرئيسية",
      url: `/${Routes.Dashboard}`,
      icon: LayoutDashboard,
    },
    {
      title: "الدخل",
      url: `/${Routes.Dashboard}/${Pages.Income}`,
      icon: ArrowUpCircle,
    },
    {
      title: "المصاريف",
      url: `/${Routes.Dashboard}/${Pages.Expense}`,
      icon: ArrowDownCircle,
    },
  ];

  const settingsNav = [
    {
      title: "الملف الشخصي",
      url: `/${Routes.Dashboard}/${Pages.Profile}`,
      icon: User,
    },
  ];

  const adminNav = [
    {
      title: "المستخدمين",
      url: `/${Routes.Dashboard}/${Pages.Users}`,
      icon: Users,
    },
  ];

  const session = useClientSession(initialSession);
  return (
    <Sidebar variant="inset" side={"right"}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-sidebar-accent"
            >
              <div className="flex items-center gap-3 p-2 select-none">
                <Image
                  src="/images/logo.jpg"
                  alt="logo"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <h1 className="heading-color">فلوسي</h1>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="select-none flex justify-between items-center">
            الرئيسية <LayoutDashboard />
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            <SidebarMenu>
              {mainNav.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `${link.url}`}
                  >
                    <Link href={link.url} className="">
                      <link.icon className="size-5" />
                      {link.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="select-none flex justify-between items-center">
            الإعدادات <SettingsIcon />
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            <SidebarMenu>
              {settingsNav.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `${link.url}`}
                  >
                    <Link href={link.url} className="">
                      <link.icon className="size-5" />
                      {link.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {session.data?.user.role === Roles.ADMIN && (
          <SidebarGroup>
            <SidebarGroupLabel className="select-none flex justify-between items-center">
              إدارة <Users />
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-1">
              <SidebarMenu>
                {adminNav.map((link) => (
                  <SidebarMenuItem key={link.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === `${link.url}`}
                    >
                      <Link href={link.url} className="">
                        <link.icon className="size-5" />
                        {link.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={() => signOut()} variant="glass">
          <User className="size-5" />
          تسجيل خروج
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
