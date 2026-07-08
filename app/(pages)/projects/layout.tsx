
import Loader from "@/components/common/Loader/Loader";
import Sidebar from "@/components/Sidebar/Sidebar";
import type { Metadata } from "next";
import { Suspense } from "react";



export const metadata: Metadata = {
  title: "Projects",
  description: "your projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div className="flex">
    <Suspense fallback={<Loader/>}>
    <Sidebar page="console"/>
    {children}
    </Suspense>
 
  </div>
  );
}
