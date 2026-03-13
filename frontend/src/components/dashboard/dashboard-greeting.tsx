'use client'

import { useAuthStore } from '@/store/auth'

export function DashboardGreeting() {
  const user = useAuthStore((s) => s.user)
  const name = user?.email?.split('@')[0] ?? 'Corps Member'

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-500 text-sm mt-1">Welcome back, {name}</p>
    </div>
  )
}
