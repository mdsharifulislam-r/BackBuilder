import Image from 'next/image'
import React from 'react'
import blog1 from "@/assets/images/hero/blog1.webp"
import blog2 from "@/assets/images/hero/blog2.webp"

const steps = [
  {
    step: '01',
    title: 'Create a project & schema',
    desc: 'Design your tables and fields visually from the Console — no SQL needed.',
    image: blog1,
  },
  {
    step: '02',
    title: 'Get instant endpoints',
    desc: 'Every table automatically becomes GET, POST, PUT and DELETE endpoints, with optional auth.',
    image: blog2,
  },
]

export default function Blogs() {
  return (
    <section className="max-w-[85rem] px-4 py-14 sm:px-6 lg:px-8 mx-auto">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <span className="section-eyebrow">How it works</span>
        <h2 className="mt-3 text-2xl font-bold md:text-4xl md:leading-tight text-ink">
          From idea to API in two steps
        </h2>
        <p className="mt-2 text-muted">
          No servers to provision, no database to configure — just build and call.
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-8">
        {steps.map((s) => (
          <div key={s.step} className="group flex flex-col rounded-2xl border border-line overflow-hidden bg-white shadow-card">
            <div className="relative pt-[55%] overflow-hidden">
              <Image
                className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                src={s.image}
                alt={s.title}
                width={1000}
                height={1000}
              />
              <span className="absolute top-3 start-3 rounded-full text-xs font-bold bg-white/90 text-primary py-1 px-3">
                Step {s.step}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-muted">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
