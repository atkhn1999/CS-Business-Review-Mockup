import React from 'react'

type SlideShellProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function SlideShell({ title, subtitle, children }: SlideShellProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 bg-primary-gradient text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight drop-shadow">
              {title}
            </h2>
            {subtitle && (
              <p className="text-white/85 font-medium">{subtitle}</p>
            )}
          </div>
          <div className="text-right text-sm opacity-90">
            <div className="font-semibold">Receptive AI Company</div>
            <div className="text-white/80">Customer Success</div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-8 bg-light-bg">{children}</div>
      <div className="h-2 bg-gradient-to-r from-teal-400 to-emerald-500" />
    </div>
  )
}

