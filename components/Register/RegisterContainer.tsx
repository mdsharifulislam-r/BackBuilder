'use client'
import pic from "@/assets/images/Login.gif"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import LoadingButton from "../common/button/Button"
import Link from "next/link"
import { useCookies } from "next-client-cookies"
import { signIn } from "next-auth/react"
import GoogleSignInButton from "./GoogleSignInButton"
import GithubSignInButton from "./GitHubSignInButton"
import { useAppDispatch } from "@/lib/hooks/hooks"
import { setTempData } from "@/lib/Store/features/UserSclice"
export default function RegisterContainer() {
  const cookie = useCookies()
  const token = cookie.get('token')
  const router = useRouter()
  const dispatch = useAppDispatch()
  useEffect(()=>{
    if(token){
      router.push('/')
    }
  },[])
  const formRef = useRef<HTMLFormElement|null>(null)
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirm_password:"",
        social_login:false
    })
    
    function addValue(e:ChangeEvent<HTMLInputElement>){
        const {name,value}=e.target
        setFormData({...formData,[name]:value})
    }
  const handlesubmit = async (e:FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
 const {email,name,password,confirm_password} = formData
  if(!email || !name || !password || !confirm_password){
    toast.error("Please fill all required field")
    return
  }
  if(password!=confirm_password){
    toast.error("Password not match")
    return
  }
    if(formData.password?.length<8){
      toast.error("Password must be up to 8 character")
      return
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/otp`,{
      method:"POST",
      body:JSON.stringify({
        email
      })
  })


  const data = await res.json()
  if(data?.success){
    dispatch(setTempData(formData))
      setFormData({
        name:"",
        email:"",
        password:"",
        confirm_password:"",
        social_login:false
      })
      toast.success(data?.message)
      formRef.current?.reset()
      router.push("/otp")
  
  }else{
    toast.error(data?.message)
  }

    
  }
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 bg-slate-50">
      <form ref={formRef} onSubmit={handlesubmit} className="max-w-screen-xl w-full bg-white border border-line shadow-card rounded-2xl flex justify-center flex-1 overflow-hidden">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold text-ink">
              Sign up for BackBuilder
            </h1>
            <p className="text-muted text-sm mt-2">Create your account and start building your API.</p>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center gap-3">
                <GoogleSignInButton />
                <GithubSignInButton />
              </div>
              <div className="my-8 border-b border-line text-center relative">
                <div className="leading-none px-3 inline-block text-sm text-muted tracking-wide font-medium bg-white absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-4 py-3.5 mb-3 rounded-lg font-medium bg-slate-50 border border-line placeholder-slate-400 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  onChange={addValue}
                />
                <input
                  className="w-full px-4 mb-3 py-3.5 rounded-lg font-medium bg-slate-50 border border-line placeholder-slate-400 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={addValue}
                />
                <input
                  className="w-full px-4 mb-3 py-3.5 rounded-lg font-medium bg-slate-50 border border-line placeholder-slate-400 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={addValue}
                />
                <input
                  className="w-full px-4 py-3.5 mb-3 rounded-lg font-medium bg-slate-50 border border-line placeholder-slate-400 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirm_password"
                  onChange={addValue}
                />
                <LoadingButton className="mt-2 tracking-wide font-semibold bg-primary text-white w-full py-3.5 rounded-lg hover:bg-primary-dark transition-colors duration-300 ease-in-out flex items-center justify-center">
                  <span>Sign up</span>
                </LoadingButton>
                <p className="text-sm text-muted my-3 text-center">
                  Already have an account?{" "}
                  <Link className="text-primary font-medium hover:underline" href={'/login'}>Log in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-primary-light text-center hidden lg:flex">
          <Image src={pic} alt="register image" width={1000} height={1000} loading="lazy" className="w-full object-cover" />
        </div>
      </form>
    </div>
  )
}
