import Image from 'next/image'
import React from 'react'
import pic from '@/assets/images/hero/hero.webp'
import Link from 'next/link'
export default function Hero() {
  return (
    <>
  {/* Hero */}
  <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
    {/* Grid */}
    <div className="grid container md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
      <div>
        <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight gfgtext-white">
          Start your journey with <span className="text-blue-600">BackBuilder</span>
        </h1>
        <p className="mt-3 text-lg text-gray-800 gfgtext-neutral-400">
          Make your own Api using GUI. Without writing a single code of code and without any database connections.
        </p>
        {/* Buttons */}
        <div className="mt-7 grid gap-3 w-full sm:inline-flex">
          <Link
            className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            href="/register"
          >
            Get started
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
          <Link
            className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none gfgbg-neutral-900 gfgborder-neutral-700 gfgtext-white gfghover:bg-neutral-800 gfgfocus:bg-neutral-800"
            href="/contact"
          >
            Contact sales team
          </Link>
        </div>
     
      </div>
      {/* End Col */}
      <div className="relative ms-4 animate-bounce-up-down">
        <Image
          className="w-full rounded-md md:min-h-[500px] object-cover"
          src={pic}
          alt="Hero Image"
          height={1000}
          width={1000}

        />
        <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 gfgfrom-neutral-800 gfgvia-neutral-900/0 gfgto-neutral-900/0" />
        {/* SVG*/}
        <div className="absolute bottom-0 start-0">
          <svg
            className="w-2/3 ms-auto h-auto text-white gfgtext-neutral-900"
            width={630}
            height={451}
            viewBox="0 0 630 451"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x={531} y={352} width={99} height={99} fill="currentColor" />
            <rect x={140} y={352} width={106} height={99} fill="currentColor" />
            <rect x={482} y={402} width={64} height={49} fill="currentColor" />
            <rect x={433} y={402} width={63} height={49} fill="currentColor" />
            <rect x={384} y={352} width={49} height={50} fill="currentColor" />
            <rect x={531} y={328} width={50} height={50} fill="currentColor" />
            <rect x={99} y={303} width={49} height={58} fill="currentColor" />
            <rect x={99} y={352} width={49} height={50} fill="currentColor" />
            <rect x={99} y={392} width={49} height={59} fill="currentColor" />
            <rect x={44} y={402} width={66} height={49} fill="currentColor" />
            <rect x={234} y={402} width={62} height={49} fill="currentColor" />
            <rect x={334} y={303} width={50} height={49} fill="currentColor" />
            <rect x={581} width={49} height={49} fill="currentColor" />
            <rect x={581} width={49} height={64} fill="currentColor" />
            <rect x={482} y={123} width={49} height={49} fill="currentColor" />
            <rect x={507} y={124} width={49} height={24} fill="currentColor" />
            <rect x={531} y={49} width={99} height={99} fill="currentColor" />
          </svg>
        </div>
        {/* End SVG*/}
      </div>
      {/* End Col */}
    </div>
    {/* End Grid */}
  </div>
  {/* End Hero */}
</>

  )
}
