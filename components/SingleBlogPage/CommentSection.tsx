import React from 'react'

export default function CommentSection() {
  return (
    <div className='w-full'>
        <div className=''> 
            <div className="repl text-2xl font-semibold py-8">
                Leave a Reply
            </div>
        <textarea name="" id="" className='w-full min-h-48 rounded-md shadow-2xl focus:outline-primary p-3 border' placeholder='Leave a reply'></textarea>
        <button className='px-3 py-2 rounded-md bg-primary text-white '>Post a Comment</button>
        </div>
    
    </div>
  )
}
