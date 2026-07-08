import Image from "next/image";
import React from "react";
import pic from "@/assets/images/console.png";

export default function Header() {
  return (
    <div className="flex justify-center">
      <div className="bg-white w-full p-8 md:p-10 flex justify-between items-center rounded-2xl border border-line shadow-card">
        <div className="text max-w-lg">
          <h1 className="md:text-4xl text-2xl font-bold text-ink pb-3">
            My <span className="text-primary">Projects</span>
          </h1>
          <p className="text-base text-muted">
            Manage your projects, schemas and endpoints — or spin up a brand new API in a couple of clicks.
          </p>
        </div>
        <Image
          src={pic}
          alt=""
          loading="lazy"
          width={1000}
          height={1000}
          className="w-[40%] md:block hidden"
        />
      </div>
    </div>
  );
}
