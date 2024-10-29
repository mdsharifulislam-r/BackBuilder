import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import LogOut from '@/lib/hooks/LogOut'
import { Logout } from '@/lib/Store/features/UserSclice'
import { useCookies } from 'next-client-cookies'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function ProfileButton() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const cookie = useCookies()
    const token = cookie.get("token")
    useEffect(()=>{
        if(!token){
            logout()
        }
    },[token])
    const logout = async () =>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`,{
            method:"DELETE"
        })
        const data = await res.json()
        if(data?.success){
            dispatch(Logout())
            toast.success(data?.message)
            router.push("/")
        }else{
            toast.error(data?.message)
        }
    }
    const user = useAppSelector(state=>state.userReduicer.user)
  return (
    <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
    <button
      id="hs-dropdown-account"
      type="button"
      className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none eretext-white"
      aria-haspopup="menu"
      aria-expanded="false"
      aria-label="Dropdown"
    >
      <img
        className="shrink-0 size-[38px] rounded-full"
        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
        alt="Avatar"
      />
    </button>
    <div
      className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 erebg-neutral-800 ereborder ereborder-neutral-700 eredivide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="hs-dropdown-account"
    >
      <div className="py-3 px-5 bg-gray-100 rounded-t-lg erebg-neutral-700">
        <p className="text-sm text-gray-500 eretext-neutral-500">
          Signed in as
        </p>
        <p className="text-sm font-medium text-gray-800 eretext-neutral-200">
          {user?.email}
        </p>
      </div>
      <div className="p-1.5 space-y-0.5">
        <Link
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 eretext-neutral-400 erehover:bg-neutral-700 erehover:text-neutral-300 erefocus:bg-neutral-700 erefocus:text-neutral-300"
          href="/console"
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          Console
        </Link>
        <a
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 eretext-neutral-400 erehover:bg-neutral-700 erehover:text-neutral-300 erefocus:bg-neutral-700 erefocus:text-neutral-300"
          href="#"
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Purchases
        </a>
        <a
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 eretext-neutral-400 erehover:bg-neutral-700 erehover:text-neutral-300 erefocus:bg-neutral-700 erefocus:text-neutral-300"
          href="#"
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m8 17 4 4 4-4" />
          </svg>
          Downloads
        </a>
        <button
        onClick={logout}
          className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 eretext-neutral-400 erehover:bg-neutral-700 erehover:text-neutral-300 erefocus:bg-neutral-700 erefocus:text-neutral-300"
        
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx={9} cy={7} r={4} />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  </div>
  )
}
