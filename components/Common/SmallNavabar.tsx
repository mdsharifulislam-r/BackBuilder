"use client";
import React, { useEffect, useRef, useState } from "react";
import logo from "@/assets/Logo/logo.webp";
import Image from "next/image";
import SmallBar from "./SmallBar";
import Cart from "./Cart";
import ProfileButton from "./ProfileButton/ProfileButton";
import { useAppSelector } from "@/lib/hooks/Hooks";
import Link from "next/link";
export default function SmallNavabar() {
  const isLogin = useAppSelector((state) => state.userReduicer.user);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const MyRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener: any = window.addEventListener("scroll", () => {
      if (MyRef.current) {
        if (window.scrollY > 50) {
          MyRef.current.classList.add("fixed");

          MyRef.current.classList.remove("relative");
        } else {
          MyRef.current.classList.remove("fixed");
          MyRef.current.classList.add("relative");
        }
      }
      return () => {
        window.removeEventListener("scroll", listener);
      };
    });
  });
  return (
    <div
      ref={MyRef}
      className="w-full py-2 z-[1000] shadow-md bg-white flex justify-between place-items-center px-4 md:hidden"
    >
      <div>
        <label
          htmlFor="navbaropen"
          className="btn btn-circle  swap swap-rotate"
        >
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
      {/* <div className="logo w-16 p-3 relative">
<Image src={logo} alt="logo" width={1000} height={1000} priority={false} className=""/>
</div> */}
      <div className="flex gap-3 place-items-center">
        {hydrated && <Cart />}
       { hydrated && <>
        {!isLogin ? (
          <div className=" flex place-items-center">
            <Link
              className="px-3 py-2 bg-secondary text-white text-sm rounded-md "
              href={"/login"}
            >
              Sign In{" "}
            </Link>
          </div>
        ) : (
          <ProfileButton />
        )}
        </>}
     
      </div>
      <SmallBar />
    </div>
  );
}
