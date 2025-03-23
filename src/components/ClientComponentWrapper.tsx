"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

// Dynamically import components with ssr: false
const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });
const ChatBot = dynamic(() => import("@/components/chat/ChatBot"), { ssr: false });

export default function ClientComponentWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16" suppressHydrationWarning={true}>
        {children}
      </main>
      <Footer />
      <ChatBot />
    </>
  );
} 