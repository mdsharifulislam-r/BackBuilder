import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  weight: [ '100', '300', '400', '500', '700', '900'], // You can specify the weights you need
  subsets: ['latin'], // Specify subsets like latin, latin-ext, etc.
});
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
 
      <body className={roboto.className}>
        <StoreProvider>
          
        
          {children}
          <Toaster
          position="top-center"/>
   
        </StoreProvider>
      </body>
    </html>
  );
}
