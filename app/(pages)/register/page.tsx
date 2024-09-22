import RegisterContaianer from '@/components/Register/RegisterContaianer'
import React from 'react'
export interface responseData {message:string,isOk:string,token?:string,type?:string} 
export default function page({searchParams}:any) {
  const response:responseData=searchParams
 
  
  return (
    <div className='bg-dark'>
      <RegisterContaianer response={response}/>
    </div>
  )
}
