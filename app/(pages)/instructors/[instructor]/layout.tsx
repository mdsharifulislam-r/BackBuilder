import { getSingleBlog } from "@/lib/Helper/getSingleBlog";
import { getSingleCourse } from "@/lib/Helper/getSingleCourse";
import { getSingleInstructor } from "@/lib/Helper/getSingleInstructor";
import { BlogType } from "@/lib/Types/Types";
import type { Metadata, ResolvingMetadata } from "next";


let nam = ""

type Props = {
  params: { instructor: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {

  const blog:BlogType = await getSingleInstructor(params?.instructor)
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
