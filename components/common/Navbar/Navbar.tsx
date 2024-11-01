'use client'
import React, { useEffect, useState } from 'react'
import ProfileButton from './ProfileButton'

import dynamic from 'next/dynamic'
import LoginButtons from './LoginButtons'
import Link from 'next/link'
import { useAppSelector } from '@/lib/hooks/hooks'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'
export default function Navbar() {
  const user = useAppSelector(state=>state.userReduicer.user)
  const [hyderd,setHydred]=useState(false)
  useEffect(()=>{
    setHydred(true)
  },[])
  return (
    <>
  {/* ========== HEADER ========== */}
  <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-blue-600 border-b text-sm py-2.5  erebg-neutral-950 ereborder-neutral-700">
    <nav className="max-w-[85rem] mx-auto w-full flex md:grid md:grid-cols-3 md:gap-x-1 basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="me-5">
        {/* Logo */}
        <Link
          className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
          href="/"
          aria-label="Preline"
        >
         <Image src={logo} alt='logo' width={80}/>
        </Link>
        {/* End Logo */}
      </div>
      <div className="hidden md:block">
        {/* Search Input */}
        <div className="relative border border-white rounded-md bg-white">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
            <svg
              className="shrink-0 size-4 text-gray-400 eretext-white/60"
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
              <circle cx={11} cy={11} r={8} />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            className="py-2 ps-10 pe-16 block w-full bg-transparent border-gray-700 rounded-lg text-sm focus:outline-none focus:border-gray-600 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none ereborder-neutral-700 eretext-neutral-400 ereplaceholder:text-neutral-400 erefocus:border-neutral-600"
            placeholder="Search"
          />
          <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-1">
            <button
              type="button"
              className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 eretext-neutral-500 erehover:text-blue-500 erefocus:text-blue-500"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
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
                <circle cx={12} cy={12} r={10} />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </button>
          </div>
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400">
            <svg
              className="shrink-0 size-3 text-gray-400 eretext-white/60"
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
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="mx-1">
              <svg
                className="shrink-0 size-3 text-gray-400 eretext-white/60"
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
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </span>
            <span className="text-xs">/</span>
          </div>
        </div>
        {/* End Search Input */}
      </div>
      <div className="flex-1 flex flex-row justify-end items-center gap-1">
        {/* Collapse */}
        <div className="md:hidden">
          <button
            type="button"
            className="hs-collapse-toggle size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none"
            id="hs-secondaru-navbar-collapse"
            aria-expanded="false"
            aria-controls="hs-secondaru-navbar"
            aria-label="Toggle navigation"
            data-hs-collapse="#hs-secondaru-navbar"
          >
            <svg
              className="hs-collapse-open:hidden size-4"
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
              <line x1={3} x2={21} y1={6} y2={6} />
              <line x1={3} x2={21} y1={12} y2={12} />
              <line x1={3} x2={21} y1={18} y2={18} />
            </svg>
            <svg
              className="hs-collapse-open:block shrink-0 hidden size-4"
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>
        {/* End Collapse */}
        <button
          type="button"
          className="md:hidden size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none"
        >
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
            <circle cx={11} cy={11} r={8} />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="sr-only">Search</span>
        </button>
        <button
          type="button"
          className="size-[38px]  relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none"
        >
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
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span className="sr-only">Notifications</span>
        </button>
        <button
          type="button"
          className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none"
        >
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
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <span className="sr-only">Activity</span>
        </button>
        {/* Dropdown */}
       {hyderd&& <LoginButtons/>}
        {/* End Dropdown */}
      </div>
    </nav>
  </header>
  {/* ========== END HEADER ========== */}
  {/* ========== MAIN CONTENT ========== */}
  <main id="content">
    {/* Secondary Navbar */}
    <div className="md:py-4 bg-white md:border-b border-gray-200 erebg-neutral-800 ereborder-neutral-700">
      <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:gap-3 px-4 sm:px-6 lg:px-8">
        {/* Collapse */}
        <div
          id="hs-secondaru-navbar"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
          aria-labelledby="hs-secondaru-navbar-collapse"
        >
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ere[&::-webkit-scrollbar-track]:bg-neutral-700 ere[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-y-0.5 md:gap-y-0 md:gap-x-6">
              <Link
                className="py-2 md:py-0 flex items-center font-medium text-sm text-blue-600 focus:outline-none focus:text-blue-600 eretext-blue-500 erefocus:text-blue-500"
                href="/"
                aria-current="page"
              >
                <svg
                  className="shrink-0 size-4 me-3 md:me-2 block md:hidden"
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
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                Home
              </Link>
            {user?.name && hyderd?
              <>
              <Link
                className="py-2 md:py-0 flex items-center font-medium text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 eretext-neutral-200 erehover:text-neutral-500 erefocus:text-neutral-500"
                href="/console"
              >
                <svg
                  className="shrink-0 size-4 me-3 md:me-2 block md:hidden"
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
                Console
              </Link>
           
              <Link
                className="py-2 md:py-0 flex items-center font-medium text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 eretext-neutral-200 erehover:text-neutral-500 erefocus:text-neutral-500"
                href="/database"
              >
                <svg
                  className="shrink-0 size-4 me-3 md:me-2 block md:hidden"
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
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
                Database
              </Link>
             </>:""}
              <Link
                className="py-2 md:py-0 flex items-center font-medium text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 eretext-neutral-200 erehover:text-neutral-500 erefocus:text-neutral-500"
                href="#"
              >
                <svg
                  className="shrink-0 size-4 me-3 md:me-2 block md:hidden"
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
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
                Documentation
              </Link>
              <Link
                className="py-2 md:py-0 flex items-center font-medium text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 eretext-neutral-200 erehover:text-neutral-500 erefocus:text-neutral-500"
                href="/contact"
              >
                <svg
                  className="shrink-0 size-4 me-3 md:me-2 block md:hidden"
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
                  <path d="M12 12h.01" />
                  <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                  <rect width={20} height={14} x={2} y={6} rx={2} />
                </svg>
                Contact Us
              </Link>
              {/* Dropdown */}
          
              {/* End Dropdown */}
            </div>
          </div>
        </div>
        {/* End Collapse */}
      </nav>
    </div>
    {/* End Secondary Navbar */}
  
  </main>
  {/* ========== END MAIN CONTENT ========== */}
</>

  )
}
