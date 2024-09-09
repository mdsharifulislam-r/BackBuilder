import React from 'react'
import Form from './Form'
import SidePart from './SidePart'
import LoginForm from '../Login/LoginForm'
import { cookies } from 'next/headers'
import { signIn } from '@/app/auth'
import { responseData } from '@/app/(pages)/register/page'
import SocialLoginButton from './SocialLoginButton'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import man from "@/assets/Register/man.webp";
export default async function RegisterContaianer({login,response}:{login?:boolean,response?:responseData}) {

  
  return (
    <div className='container flex justify-center '>
      <div className="formbox p-5 md:w-[90%] md:px-14 flex gap-2 md:flex-row flex-col-reverse   bg-white rounded-md">
     
        <div className='w-full flex flex-col place-items-center'>
        {login ? <LoginForm response={response}/>:<Form response={response}/>}
        <div className="flex place-items-center gap-4">
        <SocialLoginButton icon={<FaGoogle />} type="google" userType={response?.type} login={login} />
        <SocialLoginButton icon={<FaGithub/>} type="github"  userType={response?.type} login={login}/>
        </div>
        </div>
        <SidePart image={man}/>
      </div>

    </div>
  )
}
