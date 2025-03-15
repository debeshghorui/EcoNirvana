import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";
import ChatBot from "@/components/chat/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoRecycle - E-Waste Recycling Solutions",
  description: "Responsible e-waste recycling services for individuals and businesses. Protect the environment with proper electronic waste disposal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <ChatProvider>
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
            <ChatBot />
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
