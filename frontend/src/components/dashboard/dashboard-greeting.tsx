'use client'

import { useAuthStore } from '@/store/auth'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function DashboardGreeting() {
  const user = useAuthStore((s) => s.user)
  const name = user?.email?.split('@')[0] ?? 'Corps Member'
  const today = new Date().toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="relative overflow-hidden rounded-2xl text-white">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-nysc-green-deep via-nysc-green-dark to-nysc-green" />
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Glow */}
      <div className="absolute right-0 top-0 w-64 h-full bg-nysc-gold/5 blur-[80px] pointer-events-none" />

      <div className="relative px-6 py-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-green-300 text-xs font-medium mb-1">{today}</p>
          <h1 className="text-2xl font-black text-white">
            {getGreeting()}, <span className="capitalize">{name}</span> 👋
          </h1>
          <p className="text-green-200 text-sm mt-1">
            Welcome to your NYSC service portal. Here&apos;s your overview.
          </p>
        </div>
        {/* NYSC badge */}
        <div className="shrink-0 hidden sm:flex w-14 h-14 bg-nysc-gold/15 border border-nysc-gold/30 rounded-2xl items-center justify-center">
          <span className="font-black text-nysc-gold text-xs text-center leading-tight">
            NYSC
          </span>
        </div>
      </div>
    </div>
  )
}
