import React from "react";
import pic from "@/assets/DataNotFound/loginPlease.png";
import Image from "next/image";
import Link from "next/link";
export default function PlaseLogin() {
  return (
    <div className="flex place-items-center md:flex-row flex-col">
      <Image src={pic} alt="pic" className="md:w-1/2 w-full" />
      <div>
        <h1 className="text-4xl font-bold">
          Please Login For <span className="text-secondary">Checkout</span>
        </h1>
        <p className="py-2 text-slate-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sit
          incidunt culpa molestias adipisci voluptas modi. Voluptatibus
          reprehenderit vitae, at nobis, laudantium necessitatibus consequatur
          repellat maxime corporis iusto, voluptate eveniet.
        </p>
        <Link href={"/login"} className="px-3 py-2 rounded-md bg-secondary text-white">Login Please</Link>
      </div>
    </div>
  );
}
