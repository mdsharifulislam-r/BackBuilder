import Image from 'next/image'
import React from 'react'
import pic from '@/assets/images/hero.gif'

export default function page() {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="text-box">
          <span className="section-eyebrow">Get in touch</span>
          <h1 className='mt-3 text-3xl md:text-4xl text-ink font-bold'>Contact <span className='text-orange'>Us</span></h1>
          <p className="mt-2 text-muted">Have a question about BackBuilder? Send us a message and we&apos;ll get back to you.</p>
          <form className="mt-6 space-y-4">
            <input type="text" placeholder='Full Name' className='px-4 py-3 w-full rounded-lg border border-line focus:outline-none focus:border-primary transition-colors' />
            <input type="email" placeholder='Email Address' className='px-4 py-3 w-full rounded-lg border border-line focus:outline-none focus:border-primary transition-colors' />
            <input type="tel" placeholder='Phone Number' className='px-4 py-3 w-full rounded-lg border border-line focus:outline-none focus:border-primary transition-colors' />
            <textarea className='w-full min-h-32 p-4 rounded-lg border border-line focus:outline-none focus:border-primary transition-colors' placeholder='Message'></textarea>
            <button type="button" className='px-6 md:w-fit w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors'>Send message</button>
          </form>
        </div>
        <div className="image-box">
          <Image src={pic} alt='Contact BackBuilder' width={1000} height={1000} className="rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
