import React from 'react'
import HederTitle from '../Common/HederTitle'
import Title from '../Common/Title'
import { FaBook } from 'react-icons/fa'
import { MdOutlineDesignServices } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GiMedicines } from "react-icons/gi";
import { TbDatabaseCog } from "react-icons/tb";
import { SiJsonwebtokens } from "react-icons/si";
import { FaBullhorn } from "react-icons/fa6";
import { IoIosLaptop } from "react-icons/io";
import { IoMdPhotos } from "react-icons/io";
import { CiMusicNote1 } from "react-icons/ci";
import { BiLaptop } from 'react-icons/bi';
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

interface props{
    icon:any,
    text:string,
    color:string,
    index:number
}

function Card({icon,text,color,index}:props){
    
    const colors={
        fill:`bg-${color}-100`,
        hoverFill:`bg-${color}-600`,
        textcolor:`text-${color}-600`
    }
    const data = `icon p-6 text-2xl ${colors.fill} group-hover:bg-teal-600 group-hover:text-white duration-500 transition-all ${colors.textcolor} rounded-full`.split(' ')

    
    return(
        <div data-aos="fade-up" data-aos-delay={`${index*100}`} className='px-7 py-9 hover:shadow-lg rounded-md bg-white group flex flex-col place-items-center gap-5'>
            <div className={cn(data)}>
                {icon}
            </div>
            <div className="text text-sm md:text-base">
                {text}
            </div>
        </div>
    )
}

export default function TopCatagories() {
    const catagorydata = [
        {
            icon:<MdOutlineDesignServices/>,
            text:"Arts & Design",
            color:"teal"
        },
        {
            icon:<MdManageAccounts/>,
            text:"Management",
            color:"rose"
        },
        {
            icon:<FaCode/>,
            text:"Development",
            color:"teal"
        },
        {
            icon:<GiMedicines/>,
            text:"Health & Fitness",
            color:"rose"
        },
        {
            icon:<TbDatabaseCog/>,
            text:"Data Scince",
            color:"teal"
        },

        {
            icon:<SiJsonwebtokens/>,
            text:"Design",
            color:"rose"
        },
        {
            icon:<FaBullhorn/>,
            text:"Marketing",
            color:"teal"
        },
        {
            icon:<BiLaptop/>,
            text:"Computer Science",
            color:"rose"
        },
        {
            icon:<IoMdPhotos/>,
            text:"Photography",
            color:"teal"
        },
        {
            icon:<CiMusicNote1/>,
            text:"Music Class",
            color:"rose"
        },

    ].map((data,index)=>{
        return <Card
        key={data.text}
        icon={data.icon}
        text={data.text}
        color={data.color}
        index={index}
        />
    })
    
  return (
    <div className='bg-gradient-to-r pb-10 from-indigo-200 to-yellow-100'>
        <div className="container">

       
      <div className='text-center'>
        <Title tagline='We have lots catagories' heading='Top Categories'/>
        <p className='text-sm text-slate-400 py-4'>
        Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore</p>
      </div>
      <div className="card-section grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2  gap-3">
        {catagorydata}
      </div>
      </div>
    </div>
  )
}
