import React from 'react'

export default function CodeBlock({
  title,
  code,
  lang = 'bash',
}: {
  title?: string
  code: string
  lang?: string
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-line/20 bg-darkBlack shadow-soft my-4">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <span className="text-[11px] font-mono text-slate-400">{title}</span>
          <span className="text-[10px] uppercase tracking-wide text-slate-500">{lang}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto scroll-thin text-[13px] leading-relaxed">
        <code className="font-mono text-emerald-300 whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}
