"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cart from "./Cart";

import { useAppSelector } from "@/lib/hooks/Hooks";
import dynamic from "next/dynamic";
import ProfileButton from "./ProfileButton/ProfileButton";
import Diamond from "./Diamond/Diamond";

interface props {
  pathname: string;
  link: string;
  text: string;
}

function Navlink({ pathname, link, text }: props) {
  return (
    <>
      <li>
        <Link
          className={`text-sm  ${
            pathname == link ? "text-primary" : "text-gray-400"
          } hover:text-gray-500`}
          href={link}
        >
          {text}
        </Link>
      </li>
    </>
  );
}
export default function Navbar() {
  const MyRef = useRef<HTMLElement | null>(null);
  const isLogin = useAppSelector((state) => state.userReduicer.user);
  const pathname = usePathname();
  useEffect(() => {
    const listener: any = window.addEventListener("scroll", () => {
      if (MyRef.current) {
        if (window.scrollY > 0) {
          MyRef.current.classList.add("fixed");
          MyRef.current.classList.remove("relative");
        } else {
          MyRef.current.classList.remove("fixed");
          MyRef.current.classList.add("relative");
        }
      }
    });

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  const [navbar, setNavbar] = useState(false);

  const navlinksData = [
    {
      text: "Instructors",
      link: "/instructors",
    },
    {
      text: "Courses",
      link: "/courses",
    },
    {
      text: "Book",
      link: "/book",
    },
    {
      text: "Blog",
      link: "/blog",
    },
    {
      text: "Contact Us",
      link: "/contact",
    },
  ];

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const data = navlinksData.map((item, index) => {
    return (
      <Navlink
        text={item.text}
        link={item.link}
        pathname={pathname}
        key={Date.now() + index}
      />
    );
  });
const user = useAppSelector(state=>state.userReduicer.user)
  return (
    <>
      {/* component */}
      <nav ref={MyRef} className="w-full z-[1000] bg-white shadow ">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <a href="">
                <h2 className="text-2xl font-bold">LOGO</h2>
              </a>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                {data}
                {( hydrated && user?.name && user?.type=="student") &&  <li>
               <Diamond id={user?._id||""}/>
                </li>}
                {hydrated && <Cart />}
                {hydrated && (
                  <li>
                    {!isLogin ? (
                      <Link
                        className="px-3 py-2 bg-secondary text-white text-sm rounded-md "
                        href={"/login"}
                      >
                        Sign In{" "}
                      </Link>
                    ) : (
                      <ProfileButton />
                    )}
                  </li>
                )}
              </ul>
            </div>
            <div></div>
          </div>
        </div>
      </nav>
    </>
  );
}
