import { getSingleBlog } from "@/lib/Helper/getSingleBlog";
import { getSingleCourse } from "@/lib/Helper/getSingleCourse";
import { BlogType } from "@/lib/Types/Types";
import type { Metadata, ResolvingMetadata } from "next";


let nam = ""

type Props = {
  params: { id: string }
  
}

export async function generateMetadata(
  { params }: Props,

): Promise<Metadata> {

  const blog:BlogType = await getSingleCourse(params?.id)
  return {
    title: "Coursify | Courses | "+blog?.name,
   
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
