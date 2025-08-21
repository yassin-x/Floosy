"use client";
import { Pages, Routes } from "@/constants/enums";
import React, { useState } from "react";
import Link from "../Link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Home, Info, MenuIcon, Phone, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Nav() {
  const links = [
    {
      title: "الرئيسية",
      icon: Home,
      url: "/",
    },
    {
      title: "عن فلوسي",
      icon: Info,
      url: `/${Pages.About}`,
    },
    {
      title: "الدعم",
      icon: Phone,
      url: `https://wa.me/201096492845`,
    },
  ];
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <ul className="items-center gap-4 border px-4 py-2 rounded-full backdrop-blur-2xl lg:flex hidden relative">
        <div className="absolute inset-0 bg-black/20 blur-md shadow-lg hover:bg-black/30 -z-50" />
        {links.map((link, index) => {
          return (
            <React.Fragment key={index}>
              <li>
                <Link
                  href={link.url}
                  className={cn(
                    "text-muted-foreground hover:text-primary transition-colors duration-300 ease-in select-none flex items-center gap-2",
                    pathname.endsWith(link.url) && "heading-color"
                  )}
                >
                  <link.icon className="w-6 h-6 text-muted-foreground" />
                  {link.title}
                </Link>
              </li>
            </React.Fragment>
          );
        })}
      </ul>

      <Button className={`md:hidden`} onClick={() => setMenuOpen(!menuOpen)}>
        <MenuIcon />
      </Button>

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:translate-x-full transition-opacity duration-300 ease-in-out
       ${
         menuOpen
           ? "flex translate-x-0 pointer-events-auto"
           : "translate-x-full pointer-events-none"
       }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="absolute top-4 left-4 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            className="md:hidden"
            variant="secondary"
            onClick={() => setMenuOpen(false)}
          >
            <XIcon />
          </Button>
        </div>
      </div>

      <div
        className={`bg-card/70 backdrop-blur-2xl h-screen overflow-y-hidden fixed top-0 right-0 w-[70%] z-50 p-6 flex-col md:translate-x-full transition-transform duration-300 ease-in-out ${
          menuOpen
            ? "flex translate-x-0 pointer-events-auto"
            : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="element-center">
          <Image
            src={"/images/logo.jpg"}
            width={980}
            height={1080}
            alt="Visionaries logo"
            priority
            className="w-12 h-12 rounded-full"
          />
        </div>
        <ul className="flex flex-col items-start gap-4 mt-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.url}
                className={cn(
                  "text-muted-foreground hover:text-primary transition-colors duration-300 ease-in select-none flex items-center gap-2",
                  pathname.endsWith(`${link.url}`) && "heading-color"
                )}
              >
                <link.icon className="w-6 h-6 text-muted-foreground" />
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
