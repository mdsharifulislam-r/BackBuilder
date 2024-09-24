
import { ReactNode } from "react";
import HeaderFile from "@/components/Common/HederTitle"
import Hero from "@/components/Home/Hero";
import HomeServices from "@/components/Home/HomeServices";
import Expertise from "@/components/Home/Expertise";
import TopCatagories from "@/components/Home/TopCatagories";
import InstructorList from "@/components/Home/InstructorList";
import PopulerCourses from "@/components/Home/PopulerCourses";
import SmaillDetails from "@/components/Home/SmaillDetails";
import Testmonials from "@/components/Home/Testmonials";
import LeatestNews from "@/components/Home/LeatestNews";
import SubscribeSection from "@/components/Home/SubscribeSection";
export default function App():ReactNode{
  return <>
  <div className=" overflow-x-hidden">
    <Hero/>
    <HomeServices/>
    <Expertise/>
    <TopCatagories/>
    <InstructorList/>
    <PopulerCourses/>
    <SmaillDetails/>
    <Testmonials/>
    <LeatestNews/>
    <SubscribeSection/>
  </div>
  </>
}