import React from 'react'

const bullets = [
  { title: 'Less routine', desc: '– more productivity for your team.' },
  { title: 'Hundreds of thousands saved', desc: 'on backend development costs.' },
  { title: 'Scale budgets efficiently', desc: 'by only paying for what you use.' },
]

export default function Features() {
  return (
    <section className="max-w-[85rem] px-4 py-14 sm:px-6 lg:px-8 mx-auto">
      <div className="grid lg:grid-cols-12 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-line bg-darkBlack p-5 shadow-soft font-mono text-xs text-emerald-300 overflow-hidden">
            <div className="flex gap-1.5 mb-4">
              <span className="size-2.5 rounded-full bg-red-400/70" />
              <span className="size-2.5 rounded-full bg-amber-400/70" />
              <span className="size-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <p className="text-slate-400">{'// GET /api/user/{id}/{project}/products'}</p>
            <p><span className="text-sky-400">&#123;</span></p>
            <p>&nbsp;&nbsp;<span className="text-amber-300">&quot;success&quot;</span>: <span className="text-primary">true</span>,</p>
            <p>&nbsp;&nbsp;<span className="text-amber-300">&quot;message&quot;</span>: <span className="text-orange">&quot;Data get successfully&quot;</span>,</p>
            <p>&nbsp;&nbsp;<span className="text-amber-300">&quot;data&quot;</span>: [ ...&nbsp;]</p>
            <p><span className="text-sky-400">&#125;</span></p>
          </div>
        </div>
        {/* End Col */}
        <div className="mt-10 lg:mt-0 lg:col-span-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="font-bold text-3xl lg:text-4xl text-ink">
                Make your life easier with <span className="text-orange">BackBuilder</span>
              </h2>
              <p className="text-muted">
                Use our tools to design your data model visually, then share a working API with your team in minutes.
              </p>
            </div>
            <ul className="space-y-4">
              {bullets.map((b) => (
                <li key={b.title} className="flex gap-x-3">
                  <span className="mt-0.5 size-5 shrink-0 flex justify-center items-center rounded-full bg-primary-light text-primary">
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-sm sm:text-base text-slate-600">
                    <span className="font-semibold text-ink">{b.title}</span> {b.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* End Col */}
      </div>
    </section>
  )
}
