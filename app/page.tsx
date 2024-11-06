import Blogs from '@/components/Home/Blogs'
import Expamples from '@/components/Home/Expamples'
import Features from '@/components/Home/Features'
import FrameWorks from '@/components/Home/FrameWorks'
import Hero from '@/components/Home/Hero'
import Pricing from '@/components/Home/Pricing'
import Sabscibe from '@/components/Home/Sabscibe'
import Services from '@/components/Home/Services'
import Testmonials from '@/components/Home/Testmonials'
import React from 'react'

export default function page() {
  return (
    <div>
      <Hero/>
      <Services/>
      <Blogs/>
      <Expamples/>
      <Pricing/>
      <FrameWorks/>
      <Features/>
      <Testmonials/>
      <Sabscibe/>
    </div>
  )
}
