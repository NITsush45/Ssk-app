import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Animatedbg from "@/components/Animatedbg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "All about SSk",
  description: "Made by Sushant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={clsx(inter.variable, "bg-background text-foreground")}>
      <Animatedbg />
        {children}
      </body>
    </html>
  );
}
