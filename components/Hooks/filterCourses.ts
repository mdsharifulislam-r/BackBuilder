import { searchObject } from "@/app/(pages)/courses/page";
import { CourseType } from "../Courses/CourseCard/CourseCard";
import { Booktype } from "@/lib/Types/Types";
// this is my{anonymous} creation
export default function filterCourses(
  searchData: searchObject,
  courses: CourseType[]|Booktype[]
): any {
  const { catagories, instructors, level, price: filterPrice,id,text} = searchData;
  const categoriesSet = new Set(catagories);
  const instructorsSet = new Set(instructors);
  const levelSet = new Set(level);
  const textArray = text.includes(' ')?text.split(" "):text.split(",")

  
  
  
  const filtered = courses.filter((course) => {
    const { type, instructor, level, price } = course;
    
    return (
      (!categoriesSet.size || categoriesSet.has(type.split(" ").join("_").toLowerCase())) &&
      (!instructorsSet.size || instructorsSet.has(instructor.name.split(" ").join("_").toLowerCase())) &&
      (!levelSet.size || levelSet.has(level.split(" ").join("_").toLowerCase())) &&
      (!parseInt(filterPrice) || (parseInt(price) <= parseInt(filterPrice))|| price=='free')  &&
      (!id || course._id==id)&&
      (!text || textArray.some(item=>course.name.toLowerCase().includes(item.toLowerCase()) || course.type.toLowerCase()==item.toLowerCase() || course.instructor.name.toLowerCase().includes(item.toLowerCase())))

    );
  });

  return filtered
}
