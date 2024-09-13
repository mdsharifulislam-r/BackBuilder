import Courses from '@/components/DashBoard/InstrutorDashBoard/Courses/Courses';
import DashBoard from '@/components/DashBoard/InstrutorDashBoard/DashBoard';
import EnrollStudents from '@/components/DashBoard/InstrutorDashBoard/EnrollStudents';
import MyCourse from '@/components/DashBoard/InstrutorDashBoard/MyCoursees/MyCourse';
import Reviews from '@/components/DashBoard/InstrutorDashBoard/Reviews';
import StudentOrders from '@/components/DashBoard/StudentOrders/StudentOrders';
import UpdateForm from '@/components/DashBoard/UpdateForm';
import React from 'react'

export default function ChooseManu({id,text,type}:{id:string,text:string,type:string}) {
switch (text) {
    case "dashboard":
        return <DashBoard/>
    case "my_profile":
        return <UpdateForm id={id} type={type}/>
    case "enroll_students":
        return <EnrollStudents userId={id}/>
    case "reviews":
        return <Reviews id={id}/>
    case "my_courses":
        return <MyCourse id={id}/>
    case "courses":
        return <Courses id={id}/>
    case "orders":
        return <StudentOrders id={id}/>

    default:
        return <DashBoard/>
      
}
}
