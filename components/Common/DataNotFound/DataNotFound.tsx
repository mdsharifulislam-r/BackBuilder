import React from "react";
import image from "@/assets/DataNotFound/data-not-found.png";
import Image from "next/image";
import Link from "next/link";
export default function DataNotFound({desc,title,link,LinkText}:{desc?:string,title:string,link?:string,LinkText?:string}) {
  return (
    <div className="flex justify-center place-items-center flex-col">
      <div className="flex justify-center place-items-center flex-col md:w-[60%]">
        <Image src={image} alt="not-found Image" width={1000} height={1000} className="w-80 bounce-one" />
        <h1 className="md:text-2xl py-2 font-bold text-primary">{title}</h1>
        <p className="md:text-sm text-xs text-justify font-light text-slate-600">
          {desc|| "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique qui ad voluptatum quam repudiandae dolorem sed omnis ipsum beatae unde ducimus perspiciatis hic saepe alias, quae cupiditate maxime! Et,cumque."}
        </p>
        {link && <div className="py-3">
            <Link className="flex justify-center place-items-center py-2 bg-primary text-white px-3 text-sm rounded-md" href={link}>{LinkText}</Link>
        </div>}
      </div>
    </div>
  );
}
