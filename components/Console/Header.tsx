import Image from "next/image";
import React from "react";
import pic from "@/assets/images/console.png";
export default function Header() {
  return (
    <div className="flex justify-center">
      <div className="bg-white w-full p-10 flex justify-between rounded-md ">
        <div className="text">
          <h1 className="md:text-5xl text-2xl font-bold text-blue-600 pb-3">
            My <span className="text-orange">Projects</span>
          </h1>
          <span className="text-base font-light ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            earum corrupti adipisci perferendis, mollitia modi ut nulla eum
            minima ex?
          </span>
        </div>
        <Image
          src={pic}
          alt=""
          loading="lazy"
          width={1000}
          height={1000}
          className="w-[50%] md:block hidden"
        />
      </div>
    </div>
  );
}
