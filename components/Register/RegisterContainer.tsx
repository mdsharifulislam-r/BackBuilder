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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`,{
      method:"POST",
      body:JSON.stringify(formData)
  })


  const data = await res.json()
  if(data?.success){
    
      setFormData({
        name:"",
        email:"",
        password:"",
        confirm_password:"",
        social_login:false
      })
      toast.success(data?.message)
      formRef.current?.reset()
      router.push("/login")
  
  }else{
    toast.error(data?.message)
  }

    
  }
  return (
    <>
   
  <form ref={formRef} onSubmit={handlesubmit} className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
      <div>
    
      </div>
      <div className="mt-12 flex flex-col items-center">
        <h1 className="text-2xl xl:text-3xl font-extrabold">
          Sign up for BackBone
        </h1>
        <div className="w-full flex-1 mt-8">
          <div className="flex flex-col items-center">
       <GoogleSignInButton/>
         <GithubSignInButton/>
          </div>
          <div className="my-12 border-b text-center">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              Or sign up with e-mail
            </div>
          </div>
          <div className="mx-auto max-w-xs">
          <input
              className="w-full px-8 py-4 mb-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={addValue}
              
            />
            <input
              className="w-full px-8 mb-3 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="email"
              placeholder="Email"
              name="email"
              onChange={addValue}
            />
            <input
              className="w-full px-8 mb-3 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
              type="password"
              placeholder="Password"
              name="password"
              onChange={addValue}
            />
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              onChange={addValue}
            />
            <LoadingButton className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy={7} r={4} />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">Sign Up</span>
            </LoadingButton>
            <p className="text-sm text-slate-400 my-3">
              I already have a account <Link className="text-blue-600" href={'/login'}>Login Here</Link>
            </p>
            <p className=" text-xs text-gray-600 text-center">
              I agree to abide by templatanas
              <a href="#" className="border-b border-gray-500 border-dotted">
                Terms of Service
              </a>
              and its
              <a href="#" className="border-b border-gray-500 border-dotted">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
      <Image src={pic} alt="login image" width={1000} height={1000} loading="lazy" className="w-full object-cover"/>
    </div>
  </form>



  </>
  
  )
}
