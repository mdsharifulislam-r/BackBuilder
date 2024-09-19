'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks/Hooks"
import { Logout } from "@/lib/Store/features/UserSclice"
import Image from "next/image"
import toast from "react-hot-toast"
import avater from '@/assets/Avatar/avatar.jpg'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfileButton() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  async function logout(){
    toast.promise(fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/student/logout`,{
      method:"DELETE"
    }),{
      success:"Logout Successfully",
      error:"Logout unsuccessfull",
      loading:"Loading..."

    })
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/student/logout`,{
      method:"DELETE"
    })
    const data = await res.json()

    if(data.isOk){
      dispatch(Logout())
      router.push("/")
    }
    
  }
  const user = useAppSelector(state=>state.userReduicer.user)
  return (
    <div className=" bg-base-100">
  
    <div className="flex-none ">
 
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image
              alt="Tailwind CSS Navbar component"
              width={300}
              height={300}
              src={user?.image||avater} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link href={`/dashboard?id=${user?._id}&type=${user?.type}`} className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><a>Settings</a></li>
          <li onClick={logout}><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}
