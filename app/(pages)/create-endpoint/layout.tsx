
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Backbuikder | Create Endpoint",
  description: "Create endpoint for your project",
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
