
import Sidebar from "@/components/Sidebar/Sidebar";
import type { Metadata } from "next";



type props = {
  params: { name: string }
 
}

export async function generateMetadata(
  { params}: props,

): Promise<Metadata> {

  
  return {
    title: `Backbuilder | Endpoint | ${params?.name}`,
   
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div className="flex">
   <Sidebar page="console"/>
    {children}
  </div>
  );
}
