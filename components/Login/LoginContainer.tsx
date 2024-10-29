'use client'
import pic from "@/assets/images/Login.gif"
import { signInUser } from "@/lib/Store/features/UserSclice"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import LoadingButton from "../common/button/Button"
import { useCookies } from "next-client-cookies"
import GoogleSignInButton from "./GoogleSignInButton"
export default function LoginContainer() {
  const formRef = useRef<HTMLFormElement|null>(null)
  const cookie = useCookies()
  const token = cookie.get('token')
  const router = useRouter()
  useEffect(()=>{
    if(token){
      router.push('/')
    }
  },[])
  const dispatch = useDispatch()
  const [formData,setFormData]=useState({

        email:"",
        password:"",
    
        social_login:false
    })
    function addValue(e:ChangeEvent<HTMLInputElement>){
        const {name,value}=e.target
        setFormData({...formData,[name]:value})
    }
    const [isLoading,setLoading]=useState(false)
  const handlesubmit = async (e:FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,{
        method:"POST",
        body:JSON.stringify(formData)
    })


    const data = await res.json()

    
    if(data?.success){
      dispatch(signInUser(data?.data))
      setFormData({
      
        email:"",
        password:"",
      
        social_login:false
      })
      toast.success(data.message)
      setLoading(false)
      formRef.current?.reset()
      router.push("/console")
    }else{
      toast.error(data.message)
      setLoading(false)
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
          Sign up for BackBuilder
        </h1>
        <div className="w-full flex-1 mt-8">
          <div className="flex flex-col items-center">
           <GoogleSignInButton/>
            <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
              <div className="bg-white p-1 rounded-full">
                <svg className="w-6" viewBox="0 0 32 32">
                  <path
                    fillRule="evenodd"
                    d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                  />
                </svg>
              </div>
              <span className="ml-4">Sign In with GitHub</span>
            </button>
          </div>
          <div className="my-12 border-b text-center">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              Or sign up with e-mail
            </div>
          </div>
          <div className="mx-auto max-w-xs">
         
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
       
            <LoadingButton isLoading={isLoading} className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
              <span className="ml-3">Sign In</span>
            </LoadingButton>
            <p className="mt-6 text-xs text-gray-600 text-center">
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
