import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";

import { Header } from "./header";
import { Toast } from "@radix-ui/react-toast";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Providers>
        <Header />
        <div className="container">{children}</div>
        <Toaster />
      </Providers>
      </body>
    </html>
  
  );
}
