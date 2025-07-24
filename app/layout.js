import { Inter, Moon_Dance } from "next/font/google";
import "./globals.css";
import { ThemeProviderWrapper } from "@/components/ThemeProviderWrapper";
import { ThemeToggle } from "./theme-toggle";
import QueryProvider from "@/components/QueryProvider";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
});

const moonDance = Moon_Dance({
  weight: "400",
  variable: "--font-moon-dance",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${moonDance.variable} antialiased transition-all duration-1000`}
      >
        <ThemeProviderWrapper
          attribute="class"
          enableSystem
          defaultTheme="system"
        >
          <div className="flex justify-between m-0 py-4 dark:bg-stone-900 border-b text-center bg-white text-black dark:text-white">
            <Link href="/">
              <h3 className="text-4xl font-semibold ml-3">My AI Blog</h3>
            </Link>
            <span className="pr-4">
              <ThemeToggle />
            </span>
          </div>

          <QueryProvider>{children}</QueryProvider>
          <div className="bg-stone-900 p-4 text-white text-center">
            &copy; Copyright 2025. All rights reserved
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
