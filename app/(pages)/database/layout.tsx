
import Sidebar from "@/components/Sidebar/Sidebar";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Backbuilder | Database",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div className="flex">
   <Sidebar page="database"/>
    {children}
  </div>
  );
}
