import AuthorizePage from '@/components/Authorize/MainContainer'
import React from 'react'

export default function page({searchParams}:{searchParams:{token:string}}) {

  
  return (
    <div>
      <AuthorizePage id={searchParams.token}/>
    </div>
  )
}
