"use client";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";


import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


import LoadingButton from "../common/button/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { setTempData } from "@/lib/Store/features/UserSclice";

const BackspaceKey = "Backspace";
export default function OtpBox() {
  
  const dispatch = useAppDispatch()

    const formData = useAppSelector(state=>state.userReduicer.tempUser)
  const [otp, setOtp] = useState(["", "", "", ""]);
  const router = useRouter()
  const optRef1 = useRef<any>();
  const optRef2 = useRef<any>();
  const optRef3 = useRef<any>();
  const optRef4 = useRef<any>();

  const myref = [optRef1, optRef2, optRef3, optRef4];

  const [loading,SetLoading]=useState(false)
 
  // async function ResendOtp(){
  //   const res = await sendOtp(formData?.email,true)
  //   if(res?.isOk){
  //     toast.success(res.message)
      
  //   }else{
  //     toast.error(res.message)
  //   }
  // }
  const classNames =
    "md:w-28 w-14  md:h-28 h-14 focus:outline-none focus:shadow-xl invalid:bg-primary invalid:text-white transition-all duration-500 text-4xl text-center border rounded-md bg-dark";

  function getOtp(e: KeyboardEvent<HTMLInputElement>) {
    const value = e.key;
    const key = e.key;
    const index = parseInt(e.currentTarget.name);
    const otpValue = otp[index];

    if (e.key == "Backspace" && index != 0) {
      myref[index - 1]?.current?.focus();
      setOtp((prev) => {
        const updateOtp = [...prev];
        updateOtp[index] = "";
        return updateOtp;
      });
      return;
    }

    if (!"0123456789".includes(value) && value !== BackspaceKey) return;

    if (value === BackspaceKey && otpValue) {
      setOtp((prev) => {
        const updateOtp = [...prev];
        updateOtp[index] = "";
        return updateOtp;
      });
    } else if (value === BackspaceKey) {
    }

    if ("0123456789".includes(value)) {
      setOtp((prev) => {
        const updateOtp = [...prev];
        updateOtp[index] = e.key;
        return updateOtp;
      });

      if (index < 3) {
        myref[index + 1].current.focus();
      }
    }
 
  
  }
  async function Submit(){
    
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/otp`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:formData?.email,otp:otp.join("")})})
      const res = await response.json()
    if(res?.success){
      SetLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)})
          const dat= await res.json()
          if(dat?.success){
      
           
            router.push("/login")
            SetLoading(false)
            toast.success(dat.message)
          }else{
            SetLoading(false)
            toast.error(dat.message)
          }
        

    }else{
        toast.error(res.message)
    }
    
    
  }

  useEffect(() => {
    myref[0]?.current?.focus();
  },[]);
  return (
    <div>
    <div className="flex gap-3 py-3">
      <div>
        <input
          type="text"
          value={otp[0]}
          name="0"
          onKeyUp={(e) => getOtp(e)}
          maxLength={1}
          id="1"
          ref={optRef1}
          className={classNames}
        />
      </div>

      <div>
        <input
          type="text"
          value={otp[1]}
          name="1"
          onKeyUp={(e) => getOtp(e)}
          maxLength={1}
          id="2"
          ref={optRef2}
          className={classNames}
        />
      </div>

      <div>
        <input
          type="text"
          value={otp[2]}
          name="2"
          onKeyUp={(e) => getOtp(e)}
          maxLength={1}
          id="3"
          ref={optRef3}
          className={classNames}
        />
      </div>

      <div>
        <input
          type="text"
          value={otp[3]}
          name="3"
          onKeyUp={(e) => getOtp(e)}
          maxLength={1}
          id="4"
          ref={optRef4}
          className={classNames}
        />
      </div>
    </div>
    <LoadingButton isLoading={loading} onClick={Submit} className='bg-blue-600 py-2 text-lg text-white w-full rounded-md'>Verify</LoadingButton>
    <div className="py-3">
      otp not send? <button className="text-secondary underline" >Resend Now</button>
    </div>
    </div>
  );
}
