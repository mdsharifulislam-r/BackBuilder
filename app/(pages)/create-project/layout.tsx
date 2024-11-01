
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Backbuikder | Create Project",
  description: "Create Project for your Application",
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
