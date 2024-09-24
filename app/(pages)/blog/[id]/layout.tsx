import { getSingleBlog } from "@/lib/Helper/getSingleBlog";
import { BlogType } from "@/lib/Types/Types";
import type { Metadata, ResolvingMetadata } from "next";


let nam = ""

type props = {
  params: { id: string }
 
}

export async function generateMetadata(
  { params}: props,

): Promise<Metadata> {

  const blog:BlogType = await getSingleBlog(params?.id)
  return {
    title: "Coursify | Blog | "+blog?.name,
   
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params:{id:string}
}>) {

 

  

  return (
<div>
{children}
</div>
  
  
  );
}
