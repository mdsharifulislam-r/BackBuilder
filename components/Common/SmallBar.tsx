"use client";
import { useAppSelector } from "@/lib/hooks/Hooks";
import React, { useRef } from "react";
import SearchBar from "./SearchBar/SearchBar";
import Link from "next/link";
import { navlinksData } from "./Navbar";
import { usePathname } from "next/navigation";

export default function SmallBar() {
  const inputRef = useRef<HTMLInputElement|null>(null);
  const pathname = usePathname()

  const user = useAppSelector((state) => state.userReduicer.user);
  const data = navlinksData.map(item=>{
    return <Link onClick={()=>{
      inputRef?.current?.click();
    }}  key={item.text} href={item.link} className={`py-2 border-b w-full ${pathname==item.link?"text-primary border-b-primary":"text-slate-600"} transition-all duration-500 hover:text-primary hover:border-b-primary `}>
     
      {item.text}
     

  </Link>
  })
  
  return (
    <>
      <input
        type="checkbox"
        name=""
        id="navbaropen"
        className="peer/navopen hidden"
        ref={inputRef}
      />
      <div className="w-[80%] h-screen z-[1000] bg-white shadow-lg fixed transition-all duration-500 -translate-x-full   peer-checked/navopen:translate-x-0 top-0 left-0 p-5">
        <div className="flex justify-end">
          <div>

          </div>
          <label htmlFor="navbaropen" className="text-2xl cursor-pointer">
            X
          </label>
        </div>
        <div className="py-3 w-full flex flex-col">
          <SearchBar />
          <div className="flex flex-col pt-3">
         {data}
          </div>

        </div>
      </div>
    </>
  );
}
