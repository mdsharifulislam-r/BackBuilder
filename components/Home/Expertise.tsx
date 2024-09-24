import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import HederTitle from "../Common/HederTitle";
import Image from "next/image";
import pic1 from "@/assets/Home/expertize/pic1.webp"
import pic2 from "@/assets/Home/expertize/pic2.webp"
import pic3 from "@/assets/Home/expertize/pic3.webp"
import Users from "../Common/User";
interface props{
  isred?:boolean
}
function Card({isred}:props ){
  const green:Object ={
    mainDiv:"hover:bg-primary bg-teal-100 transition-all duration-700 hover:text-white p-4 rounded-md group",
    text:"amount text-3xl font-bold  text-primary group-hover:text-white"
  }
  const red:Object ={
    mainDiv:"hover:bg-secondary bg-rose-100  transition-all duration-700 hover:text-white p-4 rounded-md group",
    text:"amount text-3xl font-bold text-secondary text-primary group-hover:text-white"
  }
  const blass:any = isred?red:green
  return (
    <div  className={blass.mainDiv}>
      <div className={blass.text}>45.2K</div>
      <div className="type ">Student Enrolled</div>
    </div>
  );
}

export default function Expertise() {
  return (
    <div className="w-full  h-auto py-10">
      <div className="container w-full gap-x-9 flex flex-col lg:flex-row md:flex-row justify-center place-items-center">
        <div className="imageBox lg:w-1/2 md:w-1/2 w-full flex flex-row gap-3 place-items-center">
          <div className="image w-full h-full flex flex-col gap-3 ">
            <div className="img w-full h-full rounded-md overflow-hidden">
              <Image
              data-aos="zoom-out-right"
                className=""
                src={pic1}
                alt="girlpic"
                height={500}
                width={500}
              ></Image>
            </div>
            <Users />
          </div>
          <div className="image2 w-full h-full flex flex-col gap-3 ">
            <div className="img w-full h-full rounded-md overflow-hidden">
              <Image
                className=""
              data-aos="zoom-out-left"
                src={pic2}
                alt="girlpic"
                height={500}
                width={500}
              ></Image>
            </div>
            <div className="img w-full h-full rounded-md overflow-hidden">
              <Image
                className=""
                data-aos="zoom-out-up"
                src={pic3}
                alt="girlpic"
                height={500}
                width={500}
              ></Image>
            </div>
          </div>
        </div>
        <div className="textBox lg:w-1/2 md:w-1/2 w-full" data-aos="zoom-in-up">
          <div className="py-5">
            <HederTitle className="text-4xl  text-primary">
             
              Expertise Across All Disciplines
            </HederTitle>
          </div>

          <p>
            Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod ex
            tempor incididunt labore dolore magna aliquaenim minim.
          </p>
          <div className="card-section w-full grid grid-cols-2 gap-3 py-6">
            <Card/>
            <Card isred={true}/>
            <Card isred={true}/>
            <Card/>
          </div>
          <div className="button">
            <button className="btn bg-primary text-white">
              Learn More <MdOutlineArrowOutward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
