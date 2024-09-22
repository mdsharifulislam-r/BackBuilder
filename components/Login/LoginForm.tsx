"use client";
import InputBox from "../Common/InputBox";

import { MdOutlineEmail } from "react-icons/md";

import { BiLock, BiLockAlt } from "react-icons/bi";
import Link from "next/link";
import LoadingButton from "../Common/Button/Button";
import toast from "react-hot-toast";
import { auth, signIn } from "@/app/auth";
import SocialLoginButton from "../Register/SocialLoginButton";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { redirect } from "next/navigation";
import { responseData } from "@/app/(pages)/register/page";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/hooks/Hooks";
import { signInUser } from "@/lib/Store/features/UserSclice";
import { useRouter } from "next/navigation";
import { setUpdateDiamon } from "../Common/Diamond/Diamond";

export default function LoginForm({ response }: { response?: responseData }) {
  const dispatch = useAppDispatch();
  const [loading, SetLoading] = useState(false);
  const router = useRouter();

  function AddValue(e: ChangeEvent<HTMLInputElement>) {
    router.push(`/login?type=${e.target.value}`);
  }
  async function SubmitData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    SetLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${
        response?.type !== "student"  ? "instructor" : "student"
      }/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: data.type,
          email: data.email,
          password: data.pass,
          isSocialLogin: {
            status: false,
          },
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.isOk) {
          setUpdateDiamon()
          toast.error(data.message);

          SetLoading(false);
        } else {
          toast.success(data.message);

          if (data.data?.intrestTypes?.length) {
            router.push("/");
          } else {
            router.push(`/tell_about?type=${response?.type}`);
          }

          dispatch(signInUser(data.data));
          SetLoading(false);
        }
      });
  }
  return (
    <>
      <div className="flex p-4 h-full w-full justify-center place-items-center flex-col">
        <form onSubmit={SubmitData} className="w-full">
          <h1 className="text-4xl font-bold pb-5 text-darkBlack">Sign In</h1>
          <div className="flex w-full ">
            <div className="flex gap-3 py-2">
              {/* <button onClick={()=>setIsStudent(true)} className={` px-4 py-2 border-2 transition-all duration-300 ${isStudent?"text-white bg-primary ":"border-primary  text-primary"} rounded-md`}>Student</button>
            <button onClick={()=>setIsStudent(false)} className={` px-4 py-2 ${!isStudent?"text-white bg-primary ":"border-primary  text-primary"} rounded-md `}>Teacher</button> */}
              <input
                onChange={AddValue}
                type="radio"
                name="type"
                id="student"
                defaultChecked
                className="peer/student hidden "
                value={"student"}
              />
              <label
                htmlFor="student"
                className="px-4 py-2 border border-primary text-primary rounded-md peer-checked/student:bg-primary peer-checked/student:text-white cursor-pointer"
              >
                Student
              </label>
              <input
                onChange={AddValue}
                type="radio"
                name="type"
                id="teacher"
                className="peer/teacher hidden "
                value={"teacher"}
              />
              <label
                htmlFor="teacher"
                className="px-4 py-2 border border-primary text-primary rounded-md peer-checked/teacher:bg-primary peer-checked/teacher:text-white cursor-pointer"
              >
                Teacher
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <InputBox
              icon={<MdOutlineEmail />}
              name="email"
              placeholder="Your Email Address"
              type="email"
            />

            <InputBox
              icon={<BiLockAlt />}
              name="pass"
              placeholder="Password"
              type="password"
            />
            <span
              className={`text-center ${
                response?.isOk == "true" ? "text-primary" : "text-red-400"
              }`}
            >
              {response?.message}
            </span>
            <div className="pt-3">
              <LoadingButton
                isLoading={loading}
                className="w-full text-white bg-primary py-2"
              >
                Login
              </LoadingButton>
            </div>
            <div>
              I dont have any account{" "}
              <Link href={"/register"} className="text-secondary font-bold">
                Create a new account
              </Link>
            </div>
          </div>
        </form>
        <div className="flex gap-3 py-3">
          {/* <SocialLoginButton icon={<FaGoogle/>} type='google'/>
        <SocialLoginButton icon={<FaGithub/>} type='github'/> */}
        </div>
      </div>
    </>
  );
}
