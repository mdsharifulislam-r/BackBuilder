import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import PrelineScript from "@/components/PrelineScript/PrelineScript";
import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/Navbar/Navbar";
import {CookiesProvider} from "next-client-cookies/server"
const roboto = Roboto({
  weight: [ '100', '300', '400', '500', '700', '900'], // You can specify the weights you need
  subsets: ['latin'], // Specify subsets like latin, latin-ext, etc.
});
export const metadata: Metadata = {
  title: "BackBuilder",
  description: "Create your free api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
 
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
