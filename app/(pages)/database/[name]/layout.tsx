
import type { Metadata } from "next";



type props = {
  params: { name: string }
 
}

export async function generateMetadata(
  { params}: props,

): Promise<Metadata> {

  
  return {
    title: `Backbuilder | Databse | ${params?.name}`,
   
  }
}

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
