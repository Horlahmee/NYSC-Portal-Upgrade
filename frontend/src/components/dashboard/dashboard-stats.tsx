'use client'

import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { usePaymentHistory, useMyCorrections, useClearanceStatus } from '@/lib/queries'

interface StatConfig {
  label: string
  value: string
  icon: React.ElementType
  iconBg: string
  iconColor: string
  valueColor: string
  valueBg: string
}

function resolveColors(status: string) {
  switch (status) {
    case 'successful':
    case 'cleared':
      return {
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        valueColor: 'text-emerald-700',
        valueBg: 'bg-emerald-50 border-emerald-100',
      }
    case 'pending':
    case 'query':
      return {
        iconBg: 'bg-amber-50',
        iconColor: 'text-amber-600',
        valueColor: 'text-amber-700',
        valueBg: 'bg-amber-50 border-amber-100',
      }
    case 'failed':
    case 'withheld':
      return {
        iconBg: 'bg-red-50',
        iconColor: 'text-red-500',
        valueColor: 'text-red-600',
        valueBg: 'bg-red-50 border-red-100',
      }
    default:
      return {
        iconBg: 'bg-gray-50',
        iconColor: 'text-gray-400',
        valueColor: 'text-gray-600',
        valueBg: 'bg-gray-50 border-gray-100',
      }
  }
}

export function DashboardStats() {
  const payments = usePaymentHistory()
  const corrections = useMyCorrections()
  const clearance = useClearanceStatus()

  const paymentStatus =
    payments.data?.[0]?.status ?? (payments.isLoading ? '…' : 'none')
  const clearanceStatus =
    clearance.data?.[0]?.status ?? (clearance.isLoading ? '…' : 'not started')
  const openCases = corrections.isLoading
    ? '…'
    : String(
        corrections.data?.filter((c) =>
          ['pending', 'under_review'].includes(c.status)
        ).length ?? 0
      )

  const payColors = resolveColors(paymentStatus)
  const clrColors = resolveColors(clearanceStatus)

  const stats: StatConfig[] = [
    {
      label: 'Payment Status',
      value: paymentStatus,
      icon: CreditCard,
      ...payColors,
    },
    {
      label: 'LGA Clearance',
      value: clearanceStatus,
      icon: Clock,
      ...clrColors,
    },
    {
      label: 'Service Days',
      value: '—',
      icon: CheckCircle,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      valueColor: 'text-blue-700',
      valueBg: 'bg-blue-50 border-blue-100',
    },
    {
      label: 'Open Cases',
      value: openCases,
      icon: AlertCircle,
      iconBg: openCases !== '0' && openCases !== '…' ? 'bg-red-50' : 'bg-gray-50',
      iconColor:
        openCases !== '0' && openCases !== '…' ? 'text-red-500' : 'text-gray-400',
      valueColor:
        openCases !== '0' && openCases !== '…' ? 'text-red-600' : 'text-gray-500',
      valueBg:
        openCases !== '0' && openCases !== '…'
          ? 'bg-red-50 border-red-100'
          : 'bg-gray-50 border-gray-100',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, iconBg, iconColor, valueColor, valueBg }) => (
        <div key={label} className="card">
          <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
            <Icon size={19} className={iconColor} />
          </div>
          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wide mb-1.5">
            {label}
          </p>
          <span
            className={`inline-block text-sm font-bold capitalize px-2.5 py-1 rounded-lg border ${valueBg} ${valueColor}`}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}
