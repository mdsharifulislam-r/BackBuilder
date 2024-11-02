
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Backbuikder | Register",
  description: "Login and create your api",
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