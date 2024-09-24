import { InstructorType } from "@/lib/Types/Types";
import { FaStar } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import ReviewForm from "./ReviewForm";
import { GetAvarageRating } from "@/lib/Helper/MakeAvarageeRatings";
import FeaturedReview from "../SingleCourseDetails/Reviews/FeaturedReview";
export default async function TextBox({data}:{data:InstructorType}) {
  const ratings = await GetAvarageRating(data?.ratings)

  return (
    <div className="flex-[60%] py-5">
      <div className="details">
        <span className="text-primary font-bold">Instructor</span>
        <h1 className="text-3xl py-1 font-bold">{data?.name}</h1>
        <span className="text-sm font-light text-slate-500">
          {data.title}
        </span>
        <div className="flex gap-4 py-4 place-items-center">
          <div className="flex gap-1 place-items-center  text-slate-700">
            <FaUserGraduate />
            <span>{data.students.length} students |</span>
          </div>
          <div className="text-orange flex place-items-center">
            {new Array(Math.floor(ratings)).fill(<FaStar key={Date.now() * 3} />)}
            <span className="text-slate-700">({data?.ratings.length||0} ratings)</span>
          </div>
        </div>
      </div>

      <div className="details pt-5">
        <h1 className="text-2xl font-bold pb-3">About Me</h1>
        <p className="text-slate-600 font-light text-justify">
         {data.desc}
        </p>
      </div> 

      <div className="contact pt-5">
        <h1 className="text-2xl font-bold pb-3">Contact Me</h1>
        <p className="text-slate-700 ">Email:{data?.email}</p>
        <p className="text-slate-700 pt-2">Phone:{data?.phone}</p>
      </div>
      <div>
        <FeaturedReview reviews={data.ratings} id={data?._id}/>
      </div>
      <div className="w-full block md:hidden">
        <ReviewForm id={data?._id}/>
      </div>
    </div>
  );
}
