import React from 'react'
import { RiComputerLine } from "react-icons/ri";
import { LuStamp } from "react-icons/lu";
import { PiCertificate } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
interface Services{
    icon:any,
    desc:string
}
function ServicCard({icon,desc}:Services){
    const textArr:string[] = desc.split(' ')
    return (
        <div data-aos="flip-right" className='flex place-items-center gap-3 text-white'>
            <div className="iconbox text-4xl bg-teal-500 p-5 rounded-full transition-all duration-1000 group-hover:scale-105">
                {icon}
            </div>
            <div className="text text-xl">
            {textArr.length && textArr[0]} <br />
          {textArr.length && textArr.slice(1,textArr.length).join(" ")}
            </div>
        </div>
    )
}

export default function HomeServices() {
    
  return (
    <div className='bg-gradient-to-r z-[300] group -translate-y-5 from-teal-600 to-teal-300 w-full py-5'>
        <div className="container flex flex-col md:flex-row lg:flex-row lg:justify-between md:justify-between lg:place-items-center md:place-items-center gap-2">
            <ServicCard icon={<RiComputerLine/>}
             desc='3020 Online Courses'/>
             <ServicCard icon={<LuStamp/>}
             desc='Top Instructors'/>
             <ServicCard icon={<PiCertificate/>}
             desc='Online Certifications'/>
             <ServicCard icon={<FaUsers/>}
             desc='6,000 Membership'/>
         
       
        </div>
      
    </div>
  )
}
