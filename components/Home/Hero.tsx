import Image from 'next/image'
import React from 'react'
import pic from '@/assets/images/hero/hero.webp'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/60 to-white">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 xl:gap-20 md:items-center">
          <div>
            <span className="section-eyebrow">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
              </svg>
              No-code API builder
            </span>
            <h1 className="mt-4 block text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              Ship a REST API in minutes with <span className="text-primary">BackBuilder</span>
            </h1>
            <p className="mt-5 text-lg text-muted max-w-xl">
              Design your schema visually and get a fully working, hosted REST API — no backend code, no server to manage, no database to configure.
            </p>
            {/* Buttons */}
            <div className="mt-8 grid gap-3 w-full sm:inline-flex">
              <Link
                className="py-3 px-5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white shadow-pop hover:bg-primary-dark focus:outline-none focus:bg-primary-dark disabled:opacity-50 disabled:pointer-events-none transition-colors"
                href="/register"
              >
                Get started free
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24} height={24} viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
              <Link
                className="py-3 px-5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-line bg-white text-ink shadow-sm hover:bg-slate-50 focus:outline-none disabled:opacity-50 disabled:pointer-events-none transition-colors"
                href="/docs"
              >
                Read the docs
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted">
              <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-primary" /> Free to start</span>
              <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-primary" /> No code required</span>
              <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-primary" /> Instant endpoints</span>
            </div>
          </div>
          {/* End Col */}
          <div className="relative">
            <div className="relative rounded-2xl border border-line bg-white shadow-soft p-2">
              <Image
                className="w-full rounded-xl md:min-h-[420px] object-cover"
                src={pic}
                alt="BackBuilder product preview"
                height={1000}
                width={1000}
                priority
              />
            </div>
            {/* Floating code snippet card */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 w-64 rounded-xl border border-line bg-darkBlack text-emerald-300 text-[11px] font-mono p-4 shadow-soft animate-fade-up">
              <p className="text-slate-400">{'// fetch your data'}</p>
              <p><span className="text-sky-400">fetch</span>(<span className="text-amber-300">&apos;/api/user/…&apos;</span>)</p>
              <p>&nbsp;&nbsp;.then(res =&gt; res.json())</p>
            </div>
            <div className="absolute -z-10 -top-10 -right-10 size-40 bg-primary/20 blur-3xl rounded-full" />
          </div>
          {/* End Col */}
        </div>
      </div>
    </section>
  )
}
