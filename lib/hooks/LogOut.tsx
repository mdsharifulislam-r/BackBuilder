import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAppDispatch } from './hooks'
import { Logout } from '../Store/features/UserSclice'

export default function LogOut() {
    const dispatch = useAppDispatch()

    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`,{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(data=>{
            if(data?.success){
                dispatch(Logout())
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        })
    },[])
  return <></>
}
