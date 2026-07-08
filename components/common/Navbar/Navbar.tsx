'use client'
import React, { useEffect, useState } from 'react'
import LoginButtons from './LoginButtons'
import Link from 'next/link'
import { useAppSelector } from '@/lib/hooks/hooks'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'

export default function Navbar() {
  const user = useAppSelector(state => state.userReduicer.user)
  const [hyderd, setHydred] = useState(false)
  useEffect(() => {
    setHydred(true)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home', show: true },
    { href: '/console', label: 'Console', show: !!(user?.name && hyderd) },
    { href: '/database', label: 'Database', show: !!(user?.name && hyderd) },
    { href: '/docs', label: 'Documentation', show: true },
    { href: '/contact', label: 'Contact Us', show: true },
  ]

  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="sticky top-0 inset-x-0 z-[48] w-full bg-white/90 backdrop-blur-md border-b border-line">
        <nav className="max-w-[85rem] flex items-center justify-between gap-4 w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Logo */}
          <Link
            className="flex-none rounded-lg inline-flex items-center focus:outline-none focus:opacity-80"
            href="/"
            aria-label="BackBuilder"
          >
            <Image src={logo} alt="logo" width={40} height={40} className="rounded-lg" />
            <span className="ml-2 text-lg font-bold text-ink hidden sm:inline">Back<span className="text-primary">Builder</span></span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.filter(l => l.show).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-ink hover:bg-slate-100 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-9 relative inline-flex justify-center items-center rounded-lg border border-line text-slate-600 hover:bg-slate-100 focus:outline-none"
                id="hs-secondaru-navbar-collapse"
                aria-expanded="false"
                aria-controls="hs-secondaru-navbar"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-secondaru-navbar"
              >
                <svg
                  className="hs-collapse-open:hidden size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24} height={24} viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                >
                  <line x1={3} x2={21} y1={6} y2={6} />
                  <line x1={3} x2={21} y1={12} y2={12} />
                  <line x1={3} x2={21} y1={18} y2={18} />
                </svg>
                <svg
                  className="hs-collapse-open:block shrink-0 hidden size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24} height={24} viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>

            {hyderd && <LoginButtons />}
          </div>
        </nav>

        {/* Mobile collapse menu */}
        <div
          id="hs-secondaru-navbar"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:hidden border-t border-line"
          aria-labelledby="hs-secondaru-navbar-collapse"
        >
          <div className="px-4 sm:px-6 py-2 flex flex-col gap-0.5">
            {navLinks.filter(l => l.show).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2.5 flex items-center font-medium text-sm text-slate-700 hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
      {/* ========== END HEADER ========== */}
    </>
  )
}
