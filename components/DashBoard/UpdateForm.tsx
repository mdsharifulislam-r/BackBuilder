"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import InputBox from "../Common/InputBox";
import { BiLock } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { FaRegUser, FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { getSingleInstructor } from "@/lib/Helper/getSingleInstructor";
import LoadingButton from "../Common/Button/Button";
import { UpdateSingleInstructor } from "@/lib/Helper/UpdateSingleInstructor";
import toast from "react-hot-toast";
import { UpdateInstructor } from "@/lib/Helper/UpdateInstructor";
import { getStudentInfo } from "@/lib/Helper/getStudent";
import { getStudentInfoClient } from "@/lib/Helper/GetStudentInfoClient";
import { UpdateStudentInfo } from "@/lib/Helper/UpdateStudentInfo";
function TextField({ field, value }: { field: string; value: string }) {
  return (
    <div className="flex justify-between w-full p-4 lg:text-xl md:text-base text-sm">
      <span className="w-[40%] text-slate-600">{field}</span>
      <span className="w-[60%] text-slate-600">{value}</span>
    </div>
  );
}
export default function UpdateForm({ id, type }: { id: string; type: string }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    desc: "",
    facebook:"",
    github:'',
    youtube:""
  });
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if(type !== 'student'){
    getSingleInstructor(id, true).then((res) => {
      if (res) {
        setFormData({
          name: res.name,
          email: res.email,
          title: res.title,
          phone: res.phone,
          desc: res.desc,
          youtube:res.socialLinks?.youtube||"",
          facebook:res.socialLinks?.facebok||"",
          github:res.socialLinks?.github||"",
        });
      }
    });
  }else{
   getStudentInfoClient([],id)
   .then(res=>{
    if(res){
      setFormData({
        name: res.name,
        email: res.email,
        title:"",
        phone: res.phone,
        desc:"",
        youtube:res.socialLinks?.youtube||"",
        facebook:res.socialLinks?.facebok||"",
        github:res.socialLinks?.github||"",
      });
    }
   }
   )
  }
  }, []);

  function AddValue(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
   
  }

  async function SubmitData(e:FormData){
 
    
    
    const dataObj = Object.fromEntries(e.entries())

    
    const res =type !== 'student'? await UpdateInstructor(e) : await UpdateStudentInfo(e)

    if(res.isOk){
      toast.success(res.message)
    }else{
      toast.error(res.message)
    }
    
    
  }
  return (
 
    <div className="md:p-5 popUp">
      <div>
        <h1 className="text-black font-bold text-xl pb-4 border-b">
          My Profile
        </h1>
      </div>
     {edit ?<form action={SubmitData} className="flex flex-col ">
        <InputBox
          icon={<FaUser/>}
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={AddValue}
        />
        <InputBox
          icon={<MdOutlineEmail />}
          name="email"
          placeholder="Your Email Address"
          type="email"
          required
          value={formData.email}
          onChange={AddValue}
        />

        {type !== 'student' && <InputBox
          icon={<FaRegUser />}
          name="title"
          placeholder="What is your Proffetion"
          type="text"
          required
          value={formData.title}
          onChange={AddValue}
        />}

        <InputBox
          icon={<BsTelephone />}
          name="phone"
          placeholder="Your Phone Number"
          type="text"
          required
          value={formData.phone}
          onChange={AddValue}
        />

{type !== 'student'&&<textarea
        value={formData.desc}
        onChange={AddValue} required name="desc" id="" placeholder="Tell me about yourself..." className="min-h-28 p-2 border rounded-md border-primary focus:outline-none"></textarea>}
        <div className="flex gap-2">
            <LoadingButton className="my-3 px-10 py-2 bg-primary text-white rounded-md">Update</LoadingButton>
            <button onClick={()=>setEdit(false)} className='my-3 px-10 py-2 bg-secondary text-white rounded-md'>
                Cancel
            </button>
        </div>
      </form>:<div>
        <TextField
        field='Full Name'
        value={formData.name}
        />
        <TextField
        field='Email Address'
        value={formData.email}
        />
        {type !=='student' && <TextField
        field='Title'
        value={formData.title}
        />}
        <TextField
        field='Phone Number'
        value={formData.phone}
        />
       {type !=='student' && <div className="flex md:justify-between md:flex-row flex-col gap-2 w-full p-4 md:text-xl text-sm">
      <span className="w-[40%] text-slate-600">Description</span>
      <span className="md:w-[60%]  text-slate-600">{formData.desc}</span>
    </div>}
        <div>
            <button onClick={()=>setEdit(true)} className='my-3 px-10 py-2 bg-secondary text-white rounded-md'>
                Edit
            </button>
        </div>
       </div>

     }
      
    </div>
  );
}
