
import Sidebar from "@/components/Sidebar/Sidebar";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "BackBuilder | Console",
  description: "This is for Developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div className="">
 
    {children}
  </div>
  );
}
