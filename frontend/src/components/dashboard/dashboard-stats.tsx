'use client'

import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { usePaymentHistory, useMyCorrections, useClearanceStatus } from '@/lib/queries'

function valueColor(status: string) {
  switch (status) {
    case 'successful': case 'cleared': return 'text-green-600'
    case 'pending': case 'query': return 'text-yellow-600'
    case 'failed': case 'withheld': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

function valueBg(status: string) {
  switch (status) {
    case 'successful': case 'cleared': return 'bg-green-50'
    case 'pending': case 'query': return 'bg-yellow-50'
    case 'failed': case 'withheld': return 'bg-red-50'
    default: return 'bg-gray-50'
  }
}

export function DashboardStats() {
  const payments = usePaymentHistory()
  const corrections = useMyCorrections()
  const clearance = useClearanceStatus()

  const paymentStatus = payments.data?.[0]?.status ?? (payments.isLoading ? '…' : 'none')
  const clearanceStatus = clearance.data?.[0]?.status ?? (clearance.isLoading ? '…' : 'not started')
  const openCases = corrections.isLoading
    ? '…'
    : String(corrections.data?.filter((c) => ['pending', 'under_review'].includes(c.status)).length ?? 0)

  const stats = [
    {
      label: 'Payment Status',
      value: paymentStatus,
      icon: CreditCard,
      color: valueColor(paymentStatus),
      bg: valueBg(paymentStatus),
    },
    {
      label: 'LGA Clearance',
      value: clearanceStatus,
      icon: Clock,
      color: valueColor(clearanceStatus),
      bg: valueBg(clearanceStatus),
    },
    {
      label: 'Service Days',
      value: '—',
      icon: CheckCircle,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Open Cases',
      value: openCases,
      icon: AlertCircle,
      color: openCases !== '0' && openCases !== '…' ? 'text-red-600' : 'text-gray-600',
      bg: openCases !== '0' && openCases !== '…' ? 'bg-red-50' : 'bg-gray-50',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="card">
          <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
            <Icon size={20} className={color} />
          </div>
          <p className="text-xs text-gray-500 font-medium">{label}</p>
          <p className={`text-lg font-bold mt-0.5 capitalize ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  )
}
