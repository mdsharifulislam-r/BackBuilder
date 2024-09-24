import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Coursify | Checkout",
  description: "Next step in a Learning Way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div>
    {children}
   </div>
  );
}
