import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import { Toaster } from "@/components/ui/sonner";

const cairo = Cairo({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "فلـوسي | ادارة اموالك بسهولة",
  description:
    "أدارة اموالك بسهولة، معانا انت في افضل مكان لي ادارة اموالك ومصروفاتك وادخراتك وكمان مراجعة شاملة لكل مصروفاتك",
  icons: {
    icon: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning dir={"rtl"}>
      <body className={`${cairo.className} antialiased overflow-x-hidden dark`}>
        <NextAuthSessionProvider>
          {children}
          <Toaster position="top-center" />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
