'use client'
import React, { ChangeEvent, useRef, useState } from 'react'
import InputBox from '../Common/InputBox'
import { FaMoneyBill, FaPen } from 'react-icons/fa'
import {  catagories, lavel } from '../Courses/SideBar'
import LoadingButton from '../Common/Button/Button'
import { useAppSelector } from '@/lib/hooks/Hooks'
import { uploadImage } from '@/lib/Helper/imageUploader'
import { createBooks } from '@/lib/Helper/createBook'
import toast from 'react-hot-toast'

export default function Form() {
    const formRef = useRef<HTMLFormElement | null>(null)
    const user = useAppSelector(state=>state.userReduicer.user)
    const level = lavel.map(item=> <option value={item} key={item}>{item}</option>)
    const catagorie= catagories.map(item=> <option value={item} key={item}>{item}</option>)
    const [image,setImage]=useState("")
    async function GetImage(e:ChangeEvent<HTMLInputElement>){
        const imageLink = await uploadImage(e.target.files)
     
        
        setImage(imageLink)
    }
    async function CreateBook(e:FormData){
        const data = Object.fromEntries(e.entries())
       const obj = {
        ...data,
        instructor:{
            id:user?._id,
            name:user?.name
        },
        image:image,
        publishDate:new Date().toLocaleDateString(),
        description:data.desc
       }
 
       
     const res = await createBooks(obj,true)
     if(res?.isOk){
        formRef?.current?.reset()
        toast.success(res?.massage)
     }else{
        toast.error(res?.massage)
     }
       
        
        
    }
  return (
    <div>
      <form ref={formRef} action={CreateBook} className='flex flex-col gap-1'>
        <InputBox
        icon={<FaPen/>}
        placeholder='Book Name'
        name='name'
        required
        />
        <InputBox
        icon={<FaMoneyBill/>}
        placeholder='Book Price'
        name='price'
        required
        />
        
        <select name='level' required className='select border border-primary'>
            <option value="#" selected disabled>Select Level for Audience</option>
            {level}
        </select>
        <select name='type' required className='select border border-primary'>
            <option value="#" selected disabled>Select Catagories of books</option>
            {catagorie}
        </select>
        <textarea name="desc" id="" required placeholder='Book Discreption' className='p-3 my-2 rounded-md min-h-32 border-primary border focus:outline-none shadow-md'></textarea>
        <div>
            <label className="block text-sm font-medium text-white">Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-primary border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-white"
                  stroke=" #1ab69d"
                  fill=" #1ab69d"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="">Upload a file</span>
                    <input
                      id="file-upload"
                 
                      type="file"
                      className="sr-only"
                      onChange={GetImage}
                      required
                    />
                  </label>
                  <p className="pl-1 text-primary">or drag and drop</p>
                </div>
                <p className="text-xs text-primary">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div>
            <LoadingButton className='w-full py-2 bg-primary rounded-md text-white my-2 '>Publish</LoadingButton>
          </div>
      </form>
    </div>
  )
}
