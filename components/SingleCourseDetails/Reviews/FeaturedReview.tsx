import Image, { StaticImageData } from "next/image";
import React from "react";


import { FaRegStar, FaStar } from "react-icons/fa";
import { getStudentInfo } from "@/lib/Helper/getStudent";
import { review } from "@/lib/Types/Types";
import Link from "next/link";
import SeeAllLink from "./SeeAllLink";
import ReviewItem from "./ReviewIten";

export default function FeaturedReview({reviews,id}:{reviews:review[],id:string}) {
  const data = reviews?.reverse().map(item=>{
    return <ReviewItem
    user={item.user}
    star={item.star||""}
    desc={item.desc}
    key={Math.random()}
    date={item?.date}
    />
  })
  return (
    <div className="p-5 shadow-lg rounded-md mt-4 max-h-96 relative overflow-hidden">
      <h1 className="py-4 border-b text-xl font-bold">Featured Review</h1>
      <div className="con">
        {data}
      </div>
      <div className="shade px-3 absolute w-full bottom-0 left-0 h-20 py-4 flex place-items-end bg-gradient-to-t from-white to-transparent ">
        <SeeAllLink ratings={reviews} id={id}/>
      </div>
    </div>
  );
}
