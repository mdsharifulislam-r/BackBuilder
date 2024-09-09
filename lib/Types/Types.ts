import { CourseType } from "@/components/Courses/CourseCard/CourseCard";
interface isSocialLogin{
    status:boolean,
    type?:string
}
export interface Student{
    type:string,
    _id:string,
    name:string,
    email:string,
    password:string,
    phone:string,
    image:string,
    courseCollections:string[],
    pendingCourses:string[],
    isSocialLogin:isSocialLogin,
    intrestTypes:string[],
    completeVideos:string[],
}
export interface review{
    user?:string,
    desc?:string,
    star?:string,
    date?:string,
}
interface socialLinks{
    facebook:string,
    github:string,
    youtube:string
}
export interface InstructorType{
    type:string,
    _id:string,
    name:string,
    email:string,
    password:string,
    phone:string,
    image:string,
    courseCollection:string[],
    desc:string,
    isSocialLogin:isSocialLogin,
    intrestTypes:string[],
    title:string,
    socialLinks:socialLinks,
    students:string[],
    ratings:review[]
}

export interface Booktype{
    name:string,
    _id:string,
    instructor:{
        id:string,
        name:string
    },
    image:string,
    ratings?:{
        user:string,
        star:string,
        desc:string
    }[],
    publishDate:string,
    price:string,
    level:string,
    type:string,
    description:string

}