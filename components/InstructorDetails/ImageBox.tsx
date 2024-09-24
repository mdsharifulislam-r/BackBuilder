import Image from "next/image";
import image from "@/assets/Avatar/avatar.jpg"
import { FaFacebookF, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import ReviewForm from "./ReviewForm";
import { InstructorType } from "@/lib/Types/Types";
import FollowButton from "./FollowButton";
function IconBox({icon,link}:{icon:any,link?:string}){
    return (<Link className="p-4 rounded-full text-slate-400 text-xl block hover:bg-primary hover:text-white transition-all duration-300 border" href={link?link:""}>
    {icon}
    </Link>)
}

export default function ImageBox({data}:{data:InstructorType}) {
  return (
    <div className="md:w-[40%] w-full flex justify-center flex-col place-items-center p-5">
      <div className="imageBox md:w-80 md:h-80 w-44 h-44 relative rounded-full overflow-hidden">
        <Image src={data?.image} alt="image" className="absolute w-full h-full object-cover" width={1000} height={1000} />
      </div>
      <div className="iconBox flex gap-4 place-items-center py-4">
        <IconBox
        icon={<FaFacebookF/>}
        />
        <IconBox
        icon={<FaGithub/>}
        />
        <IconBox
        icon={<FaYoutube/>}
        />
      </div>
     <FollowButton data={data}/>
      <div className="w-full hidden md:block">
        <ReviewForm id={data?._id}/>
      </div>
    </div>
  )
}
