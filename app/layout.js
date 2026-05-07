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

export const metadata = {
  title: "Kholoud Salah",
  description: "Real Estate Agent - Kholoud Salah",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased  `}
      >
        <body className=" h-full  flex flex-col ">
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
