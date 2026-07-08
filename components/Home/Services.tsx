import React from 'react'
import Link from 'next/link'
import { FaBolt, FaSlidersH, FaBook, FaDatabase } from 'react-icons/fa'

const items = [
  {
    icon: FaBolt,
    title: 'Instant endpoints',
    desc: 'Every table you create is instantly exposed as GET, POST, PUT and DELETE endpoints.',
    href: null,
  },
  {
    icon: FaSlidersH,
    title: 'Fully customizable',
    desc: 'Design fields, types and auth rules for each endpoint entirely through the GUI.',
    href: null,
  },
  {
    icon: FaBook,
    title: 'Clear documentation',
    desc: 'Copy-paste ready request examples for every endpoint you build.',
    href: '/docs',
  },
  {
    icon: FaDatabase,
    title: 'Free storage',
    desc: 'Get started with 10GB of database storage at no cost.',
    href: null,
  },
]

export default function Services() {
  return (
    <section className="max-w-[85rem] px-4 py-14 sm:px-6 lg:px-8 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, desc, href }) => {
          const content = (
            <div className="h-full p-6 rounded-2xl border border-line bg-white shadow-card hover:shadow-soft hover:-translate-y-0.5 transition-all">
              <div className="flex justify-center items-center size-12 rounded-xl bg-primary-light text-primary">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{desc}</p>
            </div>
          )
          return href ? (
            <Link key={title} href={href}>{content}</Link>
          ) : (
            <div key={title}>{content}</div>
          )
        })}
      </div>
    </section>
  )
}
