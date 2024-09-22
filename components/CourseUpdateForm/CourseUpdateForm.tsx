"use client"
import { FaEdit, FaGlobe, FaMoneyBill, FaUsers } from "react-icons/fa";
import InputBox from "../Common/InputBox";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import SelectBox from "../Common/SelectBox";
import { catagories ,instructor,lavel} from "../Courses/SideBar";
import LoadingButton from "../Common/Button/Button";
import { uploadImage } from "@/lib/Helper/imageUploader";
import { useAppSelector } from "@/lib/hooks/Hooks";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { createCourse } from "@/lib/Helper/createCourse";
import toast from "react-hot-toast";
import { getSingleCourse } from "@/lib/Helper/getSingleCourse";
import { updateCourse } from "@/lib/Helper/UpdateCourse";
import ModuleUpdate from "./ModuleUpdate/ModuleUpdate";
import ModuleForm from "./ModuleUpdate/ModuleForm";


export default function UpdateCourseForm({id}:{id:string}) {

    
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
            image:image?image:formData.prevImage,
            ...formData,
            certifications:formData.certifications=="Yes"?true:false
        }
     
        
        const res = await updateCourse(Obj,id,true)
        if(res.isOk){
            toast.success(res.message)
          
        }else{
            toast.error(res.message)
        }
        
        
        
    }
    const [formData,setFormData]=useState({
        name:"",

        promovideo:"",
        level:"",
        type:"",
        price:"",
        language:"",
        student:0,
        lessons:0,
        duration:"",
        certifications:'',
        desc:"",
        prevImage:""

    })
    useEffect(()=>{
        getSingleCourse(id,true)
        .then(data=>{
         if(data?.name){
             setFormData({
                name:data.name,
                prevImage:data.image,
                promovideo:data.promovideo,
                level:data.level,
                type:data.type,
                price:data.price,
                language:data.language,
                student:data.student,
                lessons:data.lessons,
                duration:data.duration,
                certifications:data.certifications,
                desc:data.desc
            }) 
         }
            
          
        })
    },[])
    function AddValue(e:ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>){
        const {name,value} = e.target
        setFormData({...formData,[name]:value})
    }
  return (
    <div className="flex md:flex-row flex-col py-6 justify-center container gap-3  relative">
 <div  className="bg-white  w-[100%] p-10 rounded-md mx-auto shadow-md ">
      <h1 className="text-3xl pb-7 text-primary font-bold text-center">Update <span className="text-secondary">Course</span></h1>
      <form ref={myFormRef} action={SubmitData}>
        <InputBox
        icon={<FaEdit/>}
        name="name"
        placeholder="Course Name"
        required
        value={formData.name}
        onChange={AddValue}
        />
        <img src="" alt="" />
        <InputBox
        icon={<CiImageOn/>}
        type="file"
        name="image"
        placeholder="Course Thumbnail Image"
        
        onChange={GetImage}
     
        />
        <InputBox
        icon={<CiVideoOn/>}
        name="promovideo"
        placeholder="Promo Video Link"
        required
        value={formData.promovideo}
        onChange={AddValue}
        />
        <div className="flex w-full md:flex-row flex-col gap-2 py-2">
            <SelectBox
            title="For whitch type of student"
            element={lavel}
            name="level"
            required
            onChange={AddValue}
            prevValue={formData.level}
            
            />
             <SelectBox
            title="Course Catagories"
            element={catagories}
            name="type"
            required
            prevValue={formData.type}
            onChange={AddValue}
            />
        </div>
        <div className="flex w-full md:flex-row flex-col gap-x-2 py-2 justify-between">
            <InputBox
            icon={<FaMoneyBill/>}
            placeholder="price"
            type="text"
            name="price"
            required
            value={formData.price}
            onChange={AddValue}
            />
            <InputBox
            icon={<FaGlobe/>}
            placeholder="Lenguage"
            type="text"
            name="language"
            required
            value={formData.language}
            onChange={AddValue}
            />
           
        </div>
        <div className="flex md:flex-row flex-col w-full gap-x-2 py-2 justify-between">
            <InputBox
            icon={<FaUsers/>}
            placeholder="Limited Stduents"
            type="number"
            name="student"
            required
            value={formData.student}
            onChange={AddValue}
            />
            <InputBox
            icon={<FaGlobe/>}
            placeholder="How many lessons you will have"
            type="number"
            name="lessons"
            required
            value={formData.lessons}
            onChange={AddValue}
            />
           
        </div>
        <InputBox
            icon={<FaGlobe/>}
            placeholder="Your course duration"
            type="text"
            name="duration"
            required
            value={formData.duration}
            onChange={AddValue}
            />
        <div className="flex place-items-center gap-3">
            <div>certifications</div>
            <div  className="flex place-items-center gap-2">
            <input type="radio"  onChange={AddValue}  name="certifications" value={"Yes"} className="radio" id="yes" defaultChecked={formData.certifications=='Yes'}/>
            <label htmlFor="yes">yes</label>
            </div>
            <div className="flex place-items-center gap-2">
            <input type="radio" onChange={AddValue}  name="certifications" value={"No"} id="no" defaultChecked={formData.certifications=='No'} className="radio" />
            <label htmlFor="no">No</label>
            </div>
            
        </div>
        <textarea  required name="desc"
        value={formData.desc} onChange={AddValue} id="" placeholder="Course Description" className="w-full my-2 p-3 min-h-56 rounded-md border border-primary text-slate-600 focus:outline-none"></textarea>
        <LoadingButton className="my-2 w-full bg-primary text-white py-3 rounded-md">Create</LoadingButton>
      </form>
    </div>
   <ModuleUpdate courseId={id}/>
  
    </div>
   
  )
}
