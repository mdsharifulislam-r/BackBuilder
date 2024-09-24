import React from "react";
import SidePart from "../Register/SidePart";
import contactImg from "@/assets/contactUs/contact.png";
import InputBox from "../Common/InputBox";
import { FaMailBulk, FaPhone, FaUser } from "react-icons/fa";
import LoadingButton from "../Common/Button/Button";
export default function ContactContainer() {
  return (
    <div className="flex container md:flex-row-reverse flex-col-reverse justify-center gap-5 place-items-center">
      <div className="md:w-1/2 w-full">
        <div>
          <h1 className="text-4xl font-bold ">
            Get touch with <span className="text-secondary">Us</span>
          </h1>
          <p className="text-xs text-slate-500 py-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
            repellat omnis maiores delectus sed magnam beatae quasi placeat
            ipsum necessitatibus laudantium culpa dignissimos hic temporibus
    
          </p>
        </div>
        <InputBox
          icon={<FaUser />}
          name="name"
          placeholder="Enter your fullname "
        />
        <InputBox
          icon={<FaMailBulk />}
          name="email"
          type="email"
          placeholder="Enter your Email Address"
        />
        <InputBox
          icon={<FaPhone />}
          name="phone"
          type="tel"
          placeholder="Enter your Phone Number"
        />
        <textarea
          name=""
          id=""
          className="w-full min-h-32 rounded-md border border-primary p-3 focus:outline-none"
          placeholder="Your message here.."
        ></textarea>
        <LoadingButton className="w-full py-2 bg-primary text-white rounded-md hover:bg-teal-800 active:bg-teal-950 transition-all duration-300">
          Send Email
        </LoadingButton>
      </div>
      <div className="md:w-1/2 w-full">
        <SidePart image={contactImg} />
      </div>
    </div>
  );
}
