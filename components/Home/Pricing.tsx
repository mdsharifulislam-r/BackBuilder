import React from 'react'
import Link from 'next/link'
import { FaCheck } from 'react-icons/fa'

const plans = [
  {
    name: 'Professional',
    tagline: 'Everything a small team needs.',
    price: '18',
    cents: '.00',
    highlight: false,
    included: ['Up to 10 people', 'Collect data', 'Code extensibility'],
    excluded: ['Custom reports', 'Product support', 'Activity reporting'],
  },
  {
    name: 'Teams',
    tagline: 'For growing businesses.',
    price: '36',
    cents: '.99',
    highlight: true,
    included: ['Up to 10 people', 'Collect data', 'Code extensibility', 'Custom reports', 'Product support', 'Activity reporting'],
    excluded: [],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="overflow-hidden bg-slate-50 border-y border-line">
      <div className="max-w-[85rem] px-4 py-16 sm:px-6 lg:px-8 mx-auto">
        {/* Title */}
        <div className="mx-auto max-w-2xl mb-12 text-center">
          <span className="section-eyebrow">Pricing</span>
          <h2 className="mt-3 text-3xl lg:text-4xl text-ink font-bold">
            Take BackBuilder membership to build your backend even easier
          </h2>
        </div>
        {/* End Title */}
        <div className="relative xl:w-10/12 xl:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 md:p-10 rounded-2xl border transition-all duration-300 bg-white ${
                plan.highlight ? 'border-primary shadow-pop' : 'border-line shadow-card hover:shadow-soft'
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-0 end-6 -translate-y-1/2 rounded-full text-xs font-semibold bg-primary text-white py-1.5 px-4">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
              <p className="text-sm text-muted mt-1">{plan.tagline}</p>
              <div className="mt-5">
                <span className="text-5xl md:text-6xl font-bold text-ink">${plan.price}</span>
                <span className="text-lg font-bold text-ink">{plan.cents}</span>
                <span className="ms-2 text-muted text-sm">USD / monthly</span>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-y-2 sm:gap-x-6 py-4 border-t border-line">
                <ul className="space-y-3 text-sm sm:text-base">
                  {plan.included.map((f) => (
                    <li key={f} className="flex gap-x-3">
                      <span className="mt-0.5 size-5 flex shrink-0 justify-center items-center rounded-full bg-primary-light text-primary">
                        <FaCheck size={11} />
                      </span>
                      <span className="text-ink">{f}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3 text-sm sm:text-base mt-2 sm:mt-0">
                  {plan.excluded.map((f) => (
                    <li key={f} className="flex gap-x-3">
                      <span className="size-5 flex shrink-0 justify-center items-center rounded-full bg-slate-100 text-slate-400">
                        <svg className="shrink-0 size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                        </svg>
                      </span>
                      <span className="text-slate-400">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-line">
                <div>
                  <p className="text-sm text-muted">Cancel anytime.</p>
                  <p className="text-sm text-muted">No card required.</p>
                </div>
                <Link
                  href="/register"
                  className={`py-3 px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                    plan.highlight
                      ? 'border-transparent bg-primary text-white hover:bg-primary-dark'
                      : 'border-line bg-white text-ink hover:bg-slate-50'
                  }`}
                >
                  Start free trial
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">Prices in USD. Taxes may apply.</p>
        </div>
      </div>
    </section>
  )
}
