import React, { useEffect } from 'react'
import prism from 'prismjs'
import "prismjs/themes/prism-okaidia.css"
export default function CodeShow({code}:{code:string}) {
    useEffect(() => {
        prism.highlightAll(); // Highlight all code snippets
      }, [])

      
  return (
    <div className='text-[8px]'>
         <pre>
      <code className="language-javascript">
        {code}
      </code>
    </pre>
    </div>
  )
}
