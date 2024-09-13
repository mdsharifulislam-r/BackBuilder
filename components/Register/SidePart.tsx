import Image from "next/image";
import React from "react";
import man from "@/assets/Register/man.webp";
export default async function SidePart({image}:{image:string|any}) {
  
  
  return (
    <div className="w-full h-full flex flex-col  justify-center place-items-center">
      <Image src={image} alt="man" className="w-[100%]" priority={false} />
   
    </div>
  );
}
