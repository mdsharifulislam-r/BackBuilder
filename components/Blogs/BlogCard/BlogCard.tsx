import Image from "next/image";
import React from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa";
import imageData from "@/assets/Home/PopulerCourse/course3.webp"
import { BlogType, InstructorType, Student } from "@/lib/Types/Types";
import { getStudentInfo } from "@/lib/Helper/getStudent";
import { getSingleInstructor } from "@/lib/Helper/getSingleInstructor";
import Link from "next/link";
export default async function BlogCard({blog}:{blog:BlogType}) {
  const student = await getStudentInfo([],blog?.author?.id)
  const user:Student&InstructorType = student?.name ? student : await getSingleInstructor(blog?.author?.id)
  return (
    <Link href={`/blog/${blog?._id}`} data-aos="zoom-in-up" className="rounded-md overflow-hidden shadow-xl h-full w-full cursor-pointer group">
      <div className="imgBox w-full h-52 relative  overflow-hidden">
        <div className="shade z-10 absolute w-full h-full transition-all duration-500 opacity-0 group-hover:opacity-35 bg-black">

        </div>
        <Image src={blog?.image} alt="BlogPic" width={1000} height={1000} className="object-cover group-hover:scale-110 z-0 transition-all duration-500   absolute w-full h-full top-0 left-0" />
      </div>
      <div className="textBox md:px-7 md:pt-2 md:pb-7 p-5">
        <span className=" text-slate-600 font-light pb-3 block">{blog?.tags[0]}</span>
        <div className="flex place-items-center gap-2">
          <Image src={user?.image} alt="user image" width={200} height={200} className="w-10 h-10 object-cover rounded-full" />
          <div className="pb-2">
            <h1 className="text-sm">{user?.name}</h1>
            <span className="text-xs font-extralight">{user?.title || "a Student"}</span>
          </div>
        </div>
        <div className="title text-xl line-clamp-2 ">
          {blog?.name}
        </div>
        <div className="flex py-3 gap-3">
          <div className="flex place-items-center gap-2 font-light ">
            <span className="text-primary">
              <FaRegCalendarCheck />
            </span>
            <span>{blog?.publishDate}</span>
          </div>
          <div className="flex place-items-center gap-2 font-light ">
            <span className="text-primary">
              <FaRegComments />
            </span>
            <span>{blog?.comments?.length||0}</span>
          </div>
        </div>
        <div className="desc line-clamp-2 text-slate-500">
       {blog?.desc}
        </div>
      </div>
    </Link>
  );
}
