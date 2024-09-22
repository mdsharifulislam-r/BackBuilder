"use client"
import { getStudentInfo } from "@/lib/Helper/getStudent"
import { getStudentClient } from "@/lib/Helper/getStudentClient";
import { Student } from "@/lib/Types/Types";
import Image from "next/image"
import avatar from "@/assets/Avatar/avatar.jpg"
import { useEffect, useState } from "react";
import Link from "next/link";

export function StudentItem({studentId,courseId,type}:{studentId:string,courseId:string,type:string}){
   const [student,setStudent]=useState<Student | null>(null)
   useEffect(()=>{
    getStudentClient([],studentId)
     .then(res=>setStudent(res))
   },[])
    return(
        <tr>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3 rounded-full">
              <Image
                className="h-12 object-cover"
                src={student?.image||avatar}
                width={40}
                height={40}
                alt="Alex Shatov"
              />
            </div>
            <div className="font-medium text-gray-800">{student?.name}</div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <Link href={`tell:${student?.phone}`} className="text-left text-green-500 hover:underline hover:text-primary cursor-pointer" >{student?.phone}</Link>
        </td>
        <td className="p-2 whitespace-nowrap">
          <Link href={`mailto:${student?.email}`} className="text-left font-medium hover:underline hover:text-primary cursor-pointer " >
            {student?.email}
          </Link>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-lg text-center capitalize"><button className="text-sm bg-primary px-2 py-1 text-white rounded-md">{type=="pending"?"Accept":"message"}</button></div>
        </td>
      </tr>  
    )
}
export default function PendingStudents({studentData,courseId,dataType}:{studentData:string[],courseId:string,dataType:string}) {
 
    
    const data = studentData?.map(id=>{
        return <StudentItem studentId={id} key={id} courseId={courseId} type={dataType}/>
    })
  return (
    <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
    <header className="px-5 py-4 border-b border-gray-100">
      <h2 className="font-semibold text-gray-800">Students</h2>
    </header>
    <div className="p-3">
      <div className="overflow-x-auto">
        <table className=" w-full">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2 ">
                <div className="font-semibold text-left">Name</div>
              </th>
              <th className="p-2 ">
                <div className="font-semibold text-left">Phone Number</div>
              </th>
              <th className="p-2 ">
                <div className="font-semibold text-left">Email Address</div>
              </th>
              <th className="p-2 ">
                <div className="font-semibold text-center">Action</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
       {data}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}
