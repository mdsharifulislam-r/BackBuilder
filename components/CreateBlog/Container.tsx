'use client'
import React, { ChangeEvent, useRef, useState } from 'react'
import SidePart from '../Register/SidePart'
import pic from "@/assets/blog/createBlog.png"
import InputBox from '../Common/InputBox'
import { FaEdit, FaImage } from 'react-icons/fa'
import SuggetionForm from '../Tell_Me/SuggetionForm'
import LoadingButton from '../Common/Button/Button'
import { BlogType } from '@/lib/Types/Types'
import { uploadImage } from '@/lib/Helper/imageUploader'
import { useAppSelector } from '@/lib/hooks/Hooks'
import toast from 'react-hot-toast'
import { createBlog } from '@/lib/Helper/createBlog'
export default function Container() {
    const user = useAppSelector(state=>state.userReduicer.user)
    const [image,setImage]=useState("")
    const formRef = useRef<HTMLFormElement | null>(null)
    async function getImage(e:ChangeEvent<HTMLInputElement>) {
        const image =await uploadImage(e.target.files)
        setImage(image)
    }
   async function createBlogData(e:FormData){
    const objectData =JSON.parse(JSON.stringify(Object.fromEntries(e.entries())))
    const obj:BlogType = {
        name:objectData?.name,
        tags:objectData?.intrestTypes?.split(","),
        author:{
            id:user?._id!,
            name:user?.name!
        },
        image:image,
        desc:objectData?.desc,
        publishDate:new Date().toLocaleDateString()
    }
  const data = await createBlog(obj)
    if(data.isOk){
        formRef?.current?.reset()
        toast.success(data.message)
    }else{
        toast.error(data.message)
    }
    
   }
  return (
    <div className='container flex flex-col-reverse md:flex-row justify-between place-items-center'>
      <form ref={formRef} action={createBlogData} className='md:w-1/2 w-full'>
        <h1 className='text-3xl font-bold  pb-8'>Create a <span className='text-secondary'>blog</span></h1>
        <div className='flex flex-col gap-1'>
        <InputBox
        icon={<FaEdit/>}
        name='name'
        placeholder='Blog Name'
        required
        />
        <InputBox
        icon={<FaImage/>}
        name='image'
        placeholder='Image'
        type='file'
        onChange={getImage}
        required
        />
        <textarea name="desc" id="" required className='p-4 rounded-md w-full h-28 shadow-md border border-primary focus:outline-none focus:shadow-2xl' placeholder='Tell about your blog'></textarea>
        <SuggetionForm/>
        <LoadingButton className='w-full py-2 bg-primary text-white rounded-md'>Create Blog</LoadingButton>
        </div>
   
      </form>
      <div className='w-1/2'>
      <SidePart image={pic}/>
      </div>
 
    </div>
  )
}
