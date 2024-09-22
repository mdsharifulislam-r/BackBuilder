"use client"
import { FaEdit, FaGlobe, FaMoneyBill, FaUsers } from "react-icons/fa";
import InputBox from "../Common/InputBox";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import SelectBox from "../Common/SelectBox";
import { catagories ,instructor,lavel} from "../Courses/SideBar";
import LoadingButton from "../Common/Button/Button";
import { uploadImage } from "@/lib/Helper/imageUploader";
import { useAppSelector } from "@/lib/hooks/Hooks";
import { ChangeEvent, useRef, useState } from "react";
import { createCourse } from "@/lib/Helper/createCourse";
import toast from "react-hot-toast";


export default function CreateCourseForm() {
    const [image,setImage]=useState("")
    const myFormRef = useRef<HTMLFormElement|null>(null)
    const user = useAppSelector(state=>state.userReduicer.user)
    async function GetImage(e:ChangeEvent<HTMLInputElement>){
        const image = await uploadImage(e.target.files)
        setImage(image)
    }
    async function SubmitData(e:FormData) {
        const data = Object.fromEntries(e.entries())
        const Obj={
            ...data,
            instructor:{
                name:user?.name,
                id:user?._id
            },
            image:image
        }
        const res = await createCourse(Obj)
        if(res.isOk){
            toast.success(res.message)
            myFormRef.current?.reset()
        }else{
            toast.error(res.message)
        }
        
        
        
    }
  return (
    <div  className="bg-white md:w-[80%] lg:[60%] w-[90%] p-10 rounded-md">
      <h1 className="text-3xl pb-7 text-primary font-bold text-center">Create <span className="text-secondary">Course</span></h1>
      <form ref={myFormRef} action={SubmitData}>
        <InputBox
        icon={<FaEdit/>}
        name="name"
        placeholder="Course Name"
        required
        />
        <img src="" alt="" />
        <InputBox
        icon={<CiImageOn/>}
        type="file"
        name="image"
        placeholder="Course Thumbnail Image"
        required
        onChange={GetImage}
        />
        <InputBox
        icon={<CiVideoOn/>}
        name="promovideo"
        placeholder="Promo Video Link"
        required
        />
        <div className="flex w-full md:flex-row flex-col gap-2 py-2">
            <SelectBox
            title="For whitch type of student"
            element={lavel}
            name="level"
            required
            />
             <SelectBox
            title="Course Catagories"
            element={catagories}
            name="type"
            required
            />
        </div>
        <div className="flex w-full md:flex-row flex-col gap-x-2 py-2 justify-between">
            <InputBox
            icon={<FaMoneyBill/>}
            placeholder="price"
            type="text"
            name="price"
            required
            />
            <InputBox
            icon={<FaGlobe/>}
            placeholder="Lenguage"
            type="text"
            name="language"
            required
            />
           
        </div>
        <div className="flex md:flex-row flex-col w-full gap-x-2 py-2 justify-between">
            <InputBox
            icon={<FaUsers/>}
            placeholder="Limited Stduents"
            type="number"
            name="student"
            required
            />
            <InputBox
            icon={<FaGlobe/>}
            placeholder="How many lessons you will have"
            type="number"
            name="lessons"
            required
            />
           
        </div>
        <InputBox
            icon={<FaGlobe/>}
            placeholder="Your course duration"
            type="text"
            name="duration"
            required
            />
        <div className="flex place-items-center gap-3">
            <div>certifications</div>
            <div  className="flex place-items-center gap-2">
            <input type="radio" name="certifications" value={"No"} className="radio" defaultChecked />
            <label htmlFor="">yes</label>
            </div>
            <div className="flex place-items-center gap-2">
            <input type="radio" name="certifications" value={"yes"} className="radio" />
            <label htmlFor="">No</label>
            </div>
            
        </div>
        <textarea  required name="desc" id="" placeholder="Course Description" className="w-full my-2 p-3 rounded-md border border-primary text-slate-600 focus:outline-none"></textarea>
        <LoadingButton className="my-2 w-full bg-primary text-white py-3 rounded-md">Create</LoadingButton>
      </form>
    </div>
  )
}
