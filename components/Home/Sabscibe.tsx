import React from 'react'
import Link from 'next/link'

export default function Sabscibe() {
  return (
    <section className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-3xl bg-darkBlack px-8 py-14 sm:px-16 text-center relative overflow-hidden">
        <div className="absolute -top-16 -right-16 size-56 bg-primary/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-16 -left-16 size-56 bg-orange/20 blur-3xl rounded-full" />
        <div className="relative">
          <h2 className="text-2xl font-bold md:text-4xl text-white">
            Ready to build your API?
          </h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            Create a free account and get your first working endpoint in the next five minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Get started free
            </Link>
            <Link
              href="/docs"
              className="py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
