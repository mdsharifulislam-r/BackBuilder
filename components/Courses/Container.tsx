import React from "react";
import TopSecton from "./SideBar/TopSecton";
import CourseCard, { CourseType } from "./CourseCard/CourseCard";
import { getCourse } from "@/lib/Helper/getCourse";
import { searchObject } from "@/app/(pages)/courses/page";

import filterCourses from "../Hooks/filterCourses";
import { getStudentInfo } from "@/lib/Helper/getStudent";
import { cookies } from "next/headers";
import Pegination from "./Pegination";

export default async function Container({
  searchData,
  active
}: {
  searchData: searchObject;
  active:string
}) {
  const token = cookies().get('token')?.value

  const courses: CourseType[] = await getCourse();       
  const user = await getStudentInfo(['intrestTypes'])
  const arr:string[] = user?.intrestTypes
  const intrest =token ? arr?.map(item=>item.split(" ").join("_").toLowerCase()):[]
  const filter = !searchData.catagories.length && !searchData.instructors.length && !searchData.level.length && !searchData.id && !searchData.text && !searchData.price
  
  
  const choice =filter? {
    catagories:intrest,
    level:[],
    instructors:[],
    price:"",
    id:"",
    text:""
  }:searchData
  let tempcourse:CourseType[] = filterCourses(choice,courses);
  
  const data = courses
    ? tempcourse?.map((course) => {
        return (
          <CourseCard
            key={course._id}
            _id={course._id}
            name={course.name}
            instructor={course.instructor}
            duration={course.duration}
            image={course.image}
            desc={course.desc}
            rate={course.rate}
            type={course.type}
            level={course.level}
            price={course.price}
            promocodes={course.promocodes}
            ratings={course?.ratings}
          />
        );
      })
    : [];

  return (
    <div className=" lg:w-[75%] md:w-[75%] w-full lg:pl-4 md:px-2 py-2">
      <TopSecton />
      <div className="con -z-[2] lg:grid-cols-3 grid md:grid-cols-2 min-h-[1000px]  grid-cols-1 place-items-start gap-5 pt-6">
        {data}
      </div>
      <div>
<Pegination courses={courses} active={active} />
      </div>
    </div>
  );
}
