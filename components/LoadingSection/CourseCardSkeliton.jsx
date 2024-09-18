import React from 'react'
const Item = () =>{
    return (
        <div className="flex flex-col  rounded shadow-md w-full  h-96">
        <div className="h-48 rounded-t bg-dark"></div>
        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-slate-200">
            <div className="w-full h-6 rounded bg-gray-300"></div>
            <div className="w-full h-6 rounded bg-gray-300"></div>
            <div className="w-3/4 h-6 rounded bg-gray-300"></div>
        </div>
    </div>
    )
}
export default function CourseCardSkeliton() {
    const skeletonArr = new Array(9).fill(<Item key={Math.random()}/>)
  return (
<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 flex-grow'>
{skeletonArr}
</div>
  )
}
