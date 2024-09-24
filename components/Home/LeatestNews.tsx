import Image from "next/image";
import { FaArrowRightLong,FaRegClock } from "react-icons/fa6";
import half from "@/assets/Home/half.webp"
function Card(){
  return (
    <div data-aos="zoom-in-up" className="p-10 shadow-2xl bg-white rounded-md hover:scale-105 transition-all duration-500">
      <div className="date flex place-items-center gap-2 text-sm text-slate-500 ">
        <FaRegClock/> 
        20 March 2024
      </div>
      <h1 className="text-2xl font-bold py-4 hover:text-primary transition-all duration-500 ">Learn From These You  Learn Education.</h1>
      <div className="flex place-items-center gap-2 transition-all duration-500 hover:gap-3">Learn More <FaArrowRightLong/></div>
    </div>
  )
}
export default function LeatestNews() {
  return (
    <div className="w-full pt-8 min-h-48 bg-gradient-to-r from-indigo-200 to-yellow-100 relative overflow-hidden">
    
      <div className="container">
        <h1 className="text-5xl text-white font-bold">Latest News</h1>
        <div className="text flex flex-col md:flex-row lg:flex-row justify-between lg:place-items-center md:place-items-center">
          <p className="lg:w-1/2 md:w-1/2 w-full lg:text-xl md:text-lg text-sm font-extralight py-4">
            Learning communicate to global world and build a bright future and
            career development, increase your skill with our histudy.
          </p>
          <div className="button group">
            <button className="px-5 py-3 group-hover:bg-white transition-all duration-500 border rounded-full border-white text-sm flex place-items-center gap-2">See All Articles <FaArrowRightLong className=" hidden transition-all duration-500 delay-500 group-hover:block  group-hover:translate-x-2"/></button>
          </div>
        </div>
       
      </div>
      <div className="cardContainrt relative  z-[1] pb-12 ">
        <div className="container flex flex-col lg:flex-row md:flex-row justify-center place-items-center gap-4 pt-14 pb-5">
          <Card/>
          <Card/>
          <Card/>
        </div>
        
          <div className="absolute -z-[1] w-full h-1/2 bottom-0 left-0">
      <Image src={half} width={400} height={400} className="w-full h-full " alt="rer"/>
      </div>
        </div>
    </div>
  );
}
