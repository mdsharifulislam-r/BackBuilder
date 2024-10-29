'use client'
import { useAppSelector } from '@/lib/hooks/hooks'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import ProfileButton from './ProfileButton'

export default function LoginButtons() {
    const user = useAppSelector(state=>state.userReduicer.user)
  return (
    <div>
     {!user?.name? <Link href={"/register"} className='flex px-3 py-2 rounded-md place-items-center gap-2 bg-white text-blue-600'> <span>Sign Up</span> <span><FaArrowRight/></span></Link>:<ProfileButton/>}
    </div>
  )
}
