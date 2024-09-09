import Header from '@/components/Common/Header'
import Title from '@/components/Common/Title'
import CourseContainer from '@/components/Courses/CourseContainer'
import { catagories, instructor, lavel } from '@/components/Courses/SideBar'

import React from 'react'
interface props{
    searchParams:object
}
export interface searchObject{
    catagories:string[],
    level:string[],
    instructors:string[],
    price:string,
    id:string,
    text:string,
   
}
export default function AboutPage({searchParams,params}:any) {
    const dataK = searchParams 
    let searchObject:searchObject = {
        catagories:[],
        level:[],
        instructors:[],
        price:"",
        id:"",
        text:""
    }
   if(dataK){
    for(let i in dataK){
      
        
        for(let data of catagories){
            
            if(data.split(" ").join("_").toLowerCase()==i){
                searchObject.catagories.push(i)
            }
        }
        for(let data of lavel){
            if(data.split(" ").join("_").toLowerCase()==i){
                searchObject.level.push(i)
            }
        }
        for(let data of instructor){
            if(data.split(" ").join("_").toLowerCase()==i){
                searchObject.instructors.push(i)
            }
        }
        if(i=="price"){
            searchObject.price=dataK[i]
        }
        if(i=='id'){
            searchObject.id=dataK[i]
        }
        if(i=='text')
        {
            searchObject.text=dataK[i]
        }
    }
        
   }

   
    return (
        <div>
            <Header path='Courses'/>
            <div className="container">
                <Title heading='Our Courses' tagline='Find Best courses'/>
                <CourseContainer active={dataK.active} searchData={searchObject} />
            </div>
        </div>
    )
}
