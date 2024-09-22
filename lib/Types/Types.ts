import { CourseType } from "@/components/Courses/CourseCard/CourseCard";
import { cartItem } from "../Store/features/CartSlice";
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
    address?:string[],
    diamond?:number,
    isAuthor?:boolean
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
    ratings:review[],
    address?:string[],
    isAuthor?:boolean
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
export type status = "pending"|"shiping"|"deliverd"|"cencel"
export type orderItem = cartItem & {orderId?:string,orderDate?:string,userId?:string,status?:status}
export interface OrderType{
    _id?:string,
    userId:string,
    orders:orderItem[],
    orderDate:string,
    address:string,
    price:number,
    status:status,
    orderId:number
}

export interface BlogType{
    _id?:string,
    name:string,
    desc:string,
    author:{
        id:string,
        name:string,
    }
    image:string,
    publishDate:string,
    tags:string[],
    comments?:object[]
}