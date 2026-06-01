import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Scene from "@/components/3d/Scene";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saksham Mogha | Google Play Developer",
  description: "Official portfolio, support, and privacy policies for applications developed by Saksham Mogha on Google Play.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col antialiased selection:bg-indigo-500/30`}>
        <Scene />
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
