import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Coursify | Instructors",
  description: "Next step i a Learning Way",
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
