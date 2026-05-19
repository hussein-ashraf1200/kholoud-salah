import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { Toaster } from "react-hot-toast";
import { SelectedPropertyProvider } from "./lib/SelectedPropertyContext";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kholoud-salah.vercel.app";

export const metadata = {
  title: "Kholoud Salah | Real Estate - Ras El Hikma & North Coast",
  description:
    "Find luxury properties in Ras El Hikma & Modon. Sea view, lagoon view, fully finished with ACs, ready to move. Contact Kholoud Salah for the best real estate deals.",
  keywords: [
    "Ras El Hikma",
    "Modon Ras El Hikma",
    "Sea view apartments",
    "Lagoon view",
    "Fully finished with ACs",
    "Ready to move",
    "North Coast properties",
    "Real estate Egypt",
    "Kholoud Salah real estate",
  ],
  openGraph: {
    title: "Kholoud Salah | Real Estate - Ras El Hikma & North Coast",
    description:
      "Luxury sea view & lagoon view properties in Ras El Hikma. Fully finished, ready to move.",
    url: siteUrl, // ✅ URL الموقع
    siteName: "Kholoud Salah Real Estate",
    images: [
      {
        url: `${siteUrl}/og-images`, // ✅ صورة منفصلة
        width: 1200,
        height: 630,
        alt: "Kholoud Salah Real Estate - Ras El Hikma luxury properties",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="h-full flex flex-col">
          <Navbar />
          <SelectedPropertyProvider>{children}</SelectedPropertyProvider>
          <Toaster position="top-center" />
          <WhatsAppButton />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
