import mongoose, { model, models } from "mongoose";
import { InstructoScema } from "./instructorSchema/InstructorSchema";
import { courseSechema } from "./CourseSchema/CourseSchme";
import { StudentSchema } from "./StudentSchema/StudentSchema";
import { BookSchema } from "./BookSchema/BookSchema";
import { OrderSchema } from "./OrderSchema/OrderSchema";


export const InstructorModel =models?.instructor || model('instructor',InstructoScema)

export const CourseModel = models?.course || model("course",courseSechema) 
export const StudentModel = models?.student || model("student",StudentSchema) 
export const BookModel = models?.book || model("book",BookSchema ) 
export const OrderModel = models?.order || model("order",OrderSchema ) 

