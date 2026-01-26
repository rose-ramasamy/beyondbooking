import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Beyond Booking - Smart Digital Tourism Platform",
  description: "Experience-first tourism platform for Tamil Nadu with AI recommendations and operator insights",
  icons: {
    icon: process.env.NODE_ENV === 'production' ? "/beyondbooking/beyond-booking-icon.svg" : "/beyond-booking-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased overflow-x-auto`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
