import React from 'react'

export default function ProgressBar({percent}:{percent:number}) {
  return (
    <div className='w-full'>
        <div className='flex justify-between place-items-center'>
            <span>Complete</span>
            <span>{percent?.toFixed(1)}%</span>
        </div>
    <div className='w-full py-1 bg-slate-200 my-1 rounded-lg relative overflow-hidden '>
      <div style={{width:`${percent}%`||0}} className="absolute  h-full left-0 top-0 rounded-full bg-orange">

      </div>
      </div>
    
    </div>
  )
    
}
