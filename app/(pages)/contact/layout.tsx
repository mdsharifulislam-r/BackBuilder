
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "BackBuilder | Contact",
  description: "Feel free to connect me",
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
