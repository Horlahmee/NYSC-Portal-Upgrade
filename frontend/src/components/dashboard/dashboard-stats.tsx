'use client'

import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const stats = [
  { label: 'Payment Status', value: 'Up to date', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'LGA Clearance', value: 'Pending', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { label: 'Service Days', value: '245 / 365', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Open Cases', value: '0', icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-50' },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="card">
          <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
            <Icon size={20} className={color} />
          </div>
          <p className="text-xs text-gray-500 font-medium">{label}</p>
          <p className={`text-lg font-bold mt-0.5 ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  )
}
