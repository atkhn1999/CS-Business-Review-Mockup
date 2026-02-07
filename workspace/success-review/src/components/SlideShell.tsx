import React from 'react'
import { useSuccessPlanStore } from '../store'
import type { BrandColor } from '../types'

type SlideShellProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  accentOverride?: BrandColor
}

function getAccentClasses(accent?: string) {
  switch (accent) {
    case 'emerald':
      return 'from-emerald-400 to-emerald-700'
    case 'blue':
      return 'from-blue-400 to-blue-700'
    case 'indigo':
      return 'from-indigo-400 to-indigo-700'
    case 'purple':
      return 'from-purple-400 to-purple-700'
    case 'pink':
      return 'from-pink-400 to-pink-700'
    case 'orange':
      return 'from-orange-400 to-orange-600'
    case 'teal':
    default:
      return 'from-teal-400 to-teal-700'
  }
}

export function SlideShell({ title, subtitle, children, accentOverride }: SlideShellProps) {
  const brand = useSuccessPlanStore(s => s.plan.brandColor)
  const accent = getAccentClasses(accentOverride ?? brand)
  return (
    <div className="w-full h-full flex flex-col">
      <div className={`p-6 bg-gradient-to-tr ${accent} text-white`}>
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
      <div className={`h-2 bg-gradient-to-r ${accent}`} />
    </div>
  )
}

