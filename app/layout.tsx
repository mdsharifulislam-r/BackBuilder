import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Common/Footer";
import Navbar from "@/components/Common/Navbar";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import SmallNavabar from "@/components/Common/SmallNavabar";
import { AOSInit } from "./aos";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coursify",
  description: "Next step i a Learning Way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <AOSInit/>
      <body className={inter.className}>
        <StoreProvider>
          
          <SmallNavabar/>
          <Navbar />

          {children}
          <Toaster
          position="top-center"/>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
