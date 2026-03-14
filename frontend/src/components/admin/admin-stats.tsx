'use client'

import { Users, CreditCard, FileEdit, CheckSquare } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { AdminStats } from '@/types'

function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => api.get<AdminStats>('/admin/stats').then((r) => r.data),
  })
}

const cards = (stats: AdminStats) => [
  { label: 'Total Members', value: stats.totalMembers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Pending Payments', value: stats.pendingPayments, icon: CreditCard, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { label: 'Pending Corrections', value: stats.pendingCorrections, icon: FileEdit, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Pending Clearances', value: stats.pendingClearances, icon: CheckSquare, color: 'text-red-600', bg: 'bg-red-50' },
]

export function AdminStatsGrid() {
  const { data, isLoading } = useAdminStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card h-28 bg-gray-50" />
        ))}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards(data).map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="card">
          <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
            <Icon size={20} className={color} />
          </div>
          <p className="text-xs text-gray-500 font-medium">{label}</p>
          <p className={`text-2xl font-bold mt-0.5 ${color}`}>{value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}
