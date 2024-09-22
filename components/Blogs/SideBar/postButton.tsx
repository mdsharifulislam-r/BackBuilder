'use client'

import { useAppSelector } from "@/lib/hooks/Hooks"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function PostButton() {
    const user = useAppSelector(state=>state.userReduicer.user)
    const router = useRouter()
    function navigateData(){
        if(user?.name){
            router.push("/create_blog")
        }else{
            toast.error("please login first")
        }
    }
  return (
    <button onClick={navigateData} className='w-full py-2 bg-primary text-white rounded-md'>Post A  Blog</button>
  )
}
