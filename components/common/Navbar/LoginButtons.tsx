'use client'
import { useAppSelector } from '@/lib/hooks/hooks'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight, FaUser } from 'react-icons/fa'
import ProfileButton from './ProfileButton'

export default function LoginButtons() {
    const user = useAppSelector(state=>state.userReduicer.user)
  return (
    <div>
     {!user?.name? <Link href={"/register"} className='px-4 py-2 flex rounded-lg place-items-center gap-2 bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-soft'><span className='md:flex gap-2 place-items-center hidden '> <span>Sign Up</span> <span><FaArrowRight/></span></span><span className='md:hidden block'><FaUser/></span></Link>:<ProfileButton/>}
    </div>
  )
}
