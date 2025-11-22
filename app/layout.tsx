import type { Metadata } from "next";
import "./globals.css";
import { CursorTracker } from "@/components/CursorTracker";

export const metadata: Metadata = {
  title: "Stash Labs | Building the tech we wished existed",
  description: "Three students who code, solving real problems for Australian small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-epilogue antialiased bg-neutral-950 text-neutral-100">
        <CursorTracker />
        {children}
      </body>
    </html>
  );
}
