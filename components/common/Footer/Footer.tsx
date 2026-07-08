import Link from 'next/link'
import React from 'react'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()

  const columns: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: 'Product',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'Console', href: '/console' },
        { label: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Account',
      links: [
        { label: 'Sign up', href: '/register' },
        { label: 'Log in', href: '/login' },
        { label: 'Personal info', href: '/personal_info' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact us', href: '/contact' },
        { label: 'API reference', href: '/docs' },
      ],
    },
  ]

  return (
    <>
      {/* ========== FOOTER ========== */}
      <footer className="mt-16 w-full border-t border-line bg-white">
        <div className="max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center font-bold text-lg text-ink" aria-label="BackBuilder">
                Back<span className="text-primary">Builder</span>
              </Link>
              <p className="mt-3 text-sm text-muted max-w-xs">
                Design your database and get a production-ready REST API in minutes — no backend code required.
              </p>
              <p className="mt-4 text-xs text-slate-400">© {year} BackBuilder. Made by MD Shariful Islam.</p>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-ink uppercase tracking-wide">{col.title}</h4>
                <div className="mt-3 grid gap-2.5 text-sm">
                  {col.links.map((l) => (
                    <Link key={l.label} href={l.href} className="text-muted hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">Built with Next.js, Tailwind CSS, and MySQL.</p>
            <div className="flex items-center gap-4 text-muted">
              <a href="#" aria-label="GitHub" className="hover:text-primary transition-colors"><FaGithub size={16} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><FaTwitter size={16} /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors"><FaLinkedin size={16} /></a>
            </div>
          </div>
        </div>
      </footer>
      {/* ========== END FOOTER ========== */}
    </>
  )
}
