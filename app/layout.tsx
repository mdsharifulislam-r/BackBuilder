import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import PrelineScript from "@/components/PrelineScript/PrelineScript";
import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/Navbar/Navbar";
import {CookiesProvider} from "next-client-cookies/server"

const fontSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: "BackBuilder — Build a REST API without writing backend code",
  description: "Create your free api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={`${fontSans.variable} ${fontMono.variable}`}>
 
      <body>
        <StoreProvider>
          <CookiesProvider>

          
          <Navbar/>
          {children}
          <Footer/>
          <Toaster
          position="top-center"/>
   <PrelineScript/>
   </CookiesProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
