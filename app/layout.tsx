import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MRR Arena – Startup Battle Arena",
  description:
    "Choose two indie startups and let them fight in a Pokémon-like arena. MRR = HP, Growth = Attack. Super-shareable on X.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black antialiased`}
      >
        <div
          className="fixed inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(69, 10, 10, 0.4) 0%, black 50%, black 100%)",
          }}
        />
        <Analytics />
        <TooltipProvider>
          {children}
          <Toaster richColors position="top-center" />
        </TooltipProvider>
      </body>
    </html>
  );
}
