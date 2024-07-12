import type { Metadata } from "next";
import { inter } from "@/src/components/ui/fonts";
import { ThemeProvider } from "next-themes";

import Navbar from "@/src/components/navBar/navbar";
import "./globals.css";
import { Toaster } from "@/src/components/ui/sonner";


export const metadata: Metadata = {
  title: "BeAnt",
  description: "A personal finance app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Toaster position="top-center" richColors/>
        </ThemeProvider>
      </body>
    </html>
  );
}
