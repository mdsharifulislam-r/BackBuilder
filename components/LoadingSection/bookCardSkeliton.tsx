import React from 'react'
const Item =  () =>{
    return(
        <div className='w-full p-4 bg-white group shadow-lg rounded-md'>
        <div  className={`w-full block md:p-10 p-4  rounded-md relative bg-dark  cursor-pointer overflow-hidden`}>
          <div className="absolute transition-all duration-500 flex justify-center   w-8 rotate-45 backdrop-blur-lg shadow-white  bg-white -top-16  left-0">
              Sale
          </div>
          <div  className='drop-shadow-lg bg-slate-300 max-h-72 md:min-h-72 object-cover'/>
    </div>
        <div className="textBox py-2">
          <h1 className='md:text-xl text-sm font-semibold drop-shadow bg-slate-300 h-5'></h1>
          <h1 className='md:text-xl text-sm font-semibold drop-shadow bg-slate-300 h-5 my-2'></h1>
         
        </div>
      </div>
    )
}
export default function BookCardSkeliton() {
    const array = new Array(9).fill(<Item key={Math.random()}/>)
  return (
 <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 flex-grow '>
    {array}
 </div>
  )
}
