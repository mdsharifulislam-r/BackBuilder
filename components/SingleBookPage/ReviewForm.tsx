"use client";

import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from "react";

import { getSingleInstructor } from "@/lib/Helper/getSingleInstructor";
import { useAppSelector } from "@/lib/hooks/Hooks";
import toast from "react-hot-toast";
import { InstructorType, review } from "@/lib/Types/Types";
import { UpdateSingleInstructor } from "@/lib/Helper/UpdateSingleInstructor";
import LoadingButton from "@/components/Common/Button/Button";
import { getSingleCourse } from "@/lib/Helper/getSingleCourse";
import { updateCourse } from "@/lib/Helper/UpdateCourse";
import { CourseType } from "@/components/Courses/CourseCard/CourseCard";

export default function ReviewForm() {
  const user = useAppSelector((state) => state.userReduicer.user);
 
  const [desc,setDesc]=useState<string|undefined>("")
  const [star,setStar]=useState(0)



 
  
  function setStarValue(e:ChangeEvent<HTMLInputElement>){
    setStar(parseInt(e.target.value))
  }

  return (
    <form className={`md:w-[50%]  mx-auto pt-8`}>
      <div className="rating">
        <input
          type="radio"
          name="star"
          value={1}
          className="mask mask-star-2 bg-primary"
          onChange={setStarValue}
        
        />
        <input
          type="radio"
          name="star"
          value={2}
          className="mask mask-star-2 bg-primary"
          onChange={setStarValue}
    
          
        />
        <input
          type="radio"
          name="star"
          value={3}
          className="mask mask-star-2 bg-primary"
          onChange={setStarValue}
        
        />
        <input
          type="radio"
          name="star"
          value={4}
          className="mask mask-star-2 bg-primary"
          onChange={setStarValue}
         
        />
        <input
          type="radio"
          name="star"
          value={5}
          className="mask mask-star-2 bg-primary"
          onChange={setStarValue}
          defaultChecked
        />
      </div>

      <textarea
        name="desc"
        onChange={(e)=>{
         
          setDesc(e.target.value)
        }}
        value={desc}
        placeholder="Say something"
        className="w-full border focus:outline-none shadow-xl p-4 border-primary rounded-md min-h-28"
        id=""
       
      ></textarea>
      <LoadingButton className="bg-primary text-white rounded-md px-3 py-2">
       update
      </LoadingButton>
    </form>
  );
}
