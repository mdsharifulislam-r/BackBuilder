'use client'
import { UpdateSingleInstructor } from '@/lib/Helper/UpdateSingleInstructor'
import { UpdateStudentInfoObject } from '@/lib/Helper/UpdateStudentObject'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/Hooks'
import { setTempAddress } from '@/lib/Store/features/CartSlice'
import { signInUser } from '@/lib/Store/features/UserSclice'
import { useSelectedLayoutSegment } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaClosedCaptioning } from 'react-icons/fa6'

export default function AddressSection() {
    const [isAdd,setAdd]=useState(false)
    const [division,setDivision]=useState<string[]>([])
    const [district,setDistrict]=useState<string[]>([])
    const [upazilla,setUpazilla]=useState<string[]>([])
    const [address,setAddress]=useState({
        division:"",
        district:"",
        upazilla:""
    })
    useEffect(()=>{
        fetch("https://bdapis.com/api/v1.2/divisions")
            .then(res=>res.json())
            .then((data:{data:[{division:string}]})=>setDivision(()=>{
                const newArr = data?.data?.map(item=>item.division)
                return newArr
            })
            )
    },[])

   async function handleAddress(e:ChangeEvent<HTMLSelectElement>){
    const {name,value} = e.target
    setAddress(prev=>{
        return {
            ...prev,
            [name]:value
        }
    })
  
    if(name =="division"){
        const res = await fetch(`https://bdapis.com/api/v1.2/division/${value}`)
       const data:{data:{district:string}[]} = await res.json()
       const district = data?.data?.map(item=>item.district)
       setDistrict(district) 
    }
    if(name =="district"){
        const res = await fetch(`https://bdapis.com/api/v1.2/division/${address.division}`)
       const data:{data:{district:string,upazilla:[]}[]} = await res.json()
       const district = data?.data?.find(item=>item.district==value)
       setUpazilla(district?.upazilla||[])
      
    }
   }
  const divisionArr = division?.map(item=>{
    return <option value={item} key={item}>{item}</option>
  })
  const DistrictArr = district?.map(item=>{
    return <option value={item} key={item}>{item}</option>
  })
  const upazillaArr = upazilla?.map(item=>{
    return <option value={item} key={item}>{item}</option>
  })
  const dispatch = useAppDispatch()
  const allOk = address.division && address.district && address.upazilla
  const user = useAppSelector(state=>state.userReduicer.user)
  async function updateAddress(){
    const {district,division,upazilla} = address
    if(district && division && upazilla){
        const addressString = `${division},${district},${upazilla}`
        const address = user?.address?.length ? [...user?.address,addressString]:[addressString]
        const res = user?.type == 'student' ? await UpdateStudentInfoObject({
            address
        }):await UpdateSingleInstructor({address},user?._id||"")
        if(res.isOk){
            toast.success("Address add successfully")
            dispatch(signInUser({...user,address}))
            setAddress({
                district:"",
                division:"",
                upazilla:""
            })
            setAdd(false)
        }else{
            toast.error(res.massage)
        }
        
    }
  }
  const addressArray = user?.address?.map(add=>{
    return <div className='flex cursor-pointer gap-3 px-3 py-2 my-1 text-sm bg-white border' key={add}>
    <input type="radio" name='address' id={add} onChange={(e)=>dispatch(setTempAddress(e.target.id))} />
    <label htmlFor={add}>{add}</label>
    </div>
  })
  return (
    <div>
        <label className="font-medium inline-block mb-3 text-sm uppercase">
        {isAdd?"Add Address":"Select Address"}
        </label>
      {isAdd ? <> <select name='division' onChange={handleAddress}  className="block p-2 text-darkBlack bg-white border w-full text-sm">
            <option value={""} disabled selected>Select your Division</option>
       {divisionArr}
        </select>
        <select name='district' onChange={handleAddress}  className="block my-2 p-2 text-darkBlack bg-white border w-full text-sm">
        <option value={""} disabled selected>Select your District</option>
       {DistrictArr}
        </select>
        <select name='upazilla' onChange={handleAddress}  className="block my-2 p-2 text-darkBlack bg-white border w-full text-sm">
        <option value={""} disabled selected>Select your Upazilla</option>
       {upazillaArr}
        </select></>:addressArray}
        <div>
          <button onClick={ ()=>!allOk ? setAdd(prev=>!prev):updateAddress()} className="w-full py-2 bg-primary text-white  text-sm my-2">{isAdd?allOk?"Add Address":"Cencel":"Add Address"}</button>
        </div>
      </div>
  )
}
