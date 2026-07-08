import { useAppSelector } from '@/lib/hooks/hooks'
import MultiSelect from '@/lib/hooks/MultipleSelect'
import React, { useEffect, useState } from 'react'

export default function AuthMethods() {
    const endpoint_id = useAppSelector(state=>state.cartReduicer.endpoint_id)

    const [endpoint,setEndpoint]=useState<any>({})

    useEffect(()=>{
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/endpoints/${endpoint_id}?single=true`)
      .then(res=>res.json())
      .then(data=>setEndpoint(data?.data))
    },[endpoint_id])

async function updateItems(values:any) {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/endpoints/${endpoint_id}`,{
        method:"PATCH",
        body:JSON.stringify({is_auth_required:values.join(",")})
    })
    
}
    
  return (
    <div className='px-5'>
      <label htmlFor="" className='py-2 block text-gray-600'>Authenticate Methods</label>
      <MultiSelect options={[
          {label:"POST",value:"POST"},
          {label:"GET",value:"GET"},
          {label:"PUT",value:"PUT"},
          {label:"PATCH",value:"PATCH"},
          {label:"DELETE",value:"DELETE"}
        ]} onChange={(values:any)=>updateItems(values?.map((item:any)=>item.value))} selectedItems={endpoint?.is_auth_required?.split(",")?.map((item:any)=>({label:item,value:item}))}
        />
    </div>
  )
}
