import BookContainer from '@/components/Books/BookContainer'
import Header from '@/components/Common/Header'
import React from 'react'
import { searchObject } from '../courses/page'
import { catagories, instructor, lavel } from '@/components/Courses/SideBar'

export default function page({searchParams,params}:any) {
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
    <div className='w-full '>
      <Header path='Books'/>
      <BookContainer searchData={searchObject}/>
    </div>
  )
}
