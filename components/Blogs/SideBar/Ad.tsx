import Image from 'next/image'
import React from 'react'
import ad from "@/assets/ad/pinkAd.jpg"
export default function Ad() {
  return (
    <div>
      <Image src={ad} alt={"ad"} width={1000} height={1000} />
    </div>
  )
}
