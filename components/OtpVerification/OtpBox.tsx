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
  const [resending, setResending] = useState(false)

  async function ResendOtp(){
    if(!formData?.email) return
    setResending(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/otp`,{
      method:"POST",
      body:JSON.stringify({ email: formData.email })
    })
    const data = await res.json()
    if(data?.success){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
    setResending(false)
  }
  const classNames =
    "md:w-20 w-14 md:h-20 h-14 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-3xl text-center border border-line rounded-xl bg-white shadow-sm";

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
    <LoadingButton isLoading={loading} onClick={Submit} className='bg-primary py-3 text-base font-semibold text-white w-full rounded-lg hover:bg-primary-dark transition-colors'>Verify</LoadingButton>
    <div className="py-3 text-sm text-muted">
      Didn&apos;t get a code?{" "}
      <button type="button" disabled={resending} onClick={ResendOtp} className="text-primary font-medium hover:underline disabled:opacity-50">
        {resending ? "Sending…" : "Resend now"}
      </button>
    </div>
    </div>
  );
}
