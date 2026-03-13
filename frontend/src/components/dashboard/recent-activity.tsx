'use client'

import { formatDistanceToNow } from 'date-fns'
import { usePaymentHistory, useMyCorrections, useClearanceStatus } from '@/lib/queries'
import { Payment, CourseCorrection, LgaClearance } from '@/types'

const typeColors: Record<string, string> = {
  payment: 'bg-green-100 text-green-700',
  correction: 'bg-blue-100 text-blue-700',
  clearance: 'bg-yellow-100 text-yellow-700',
}

interface ActivityItem {
  id: string
  title: string
  type: string
  time: Date
}

function fromPayments(payments: Payment[]): ActivityItem[] {
  return payments.map((p) => ({
    id: `pay-${p.id}`,
    title: `${p.paymentType} payment — ${p.status}`,
    type: 'payment',
    time: new Date(p.createdAt),
  }))
}

function fromCorrections(corrections: CourseCorrection[]): ActivityItem[] {
  return corrections.map((c) => ({
    id: `cor-${c.id}`,
    title: `Correction request: ${c.correctionType} (${c.status})`,
    type: 'correction',
    time: new Date(c.createdAt),
  }))
}

function fromClearance(clearances: LgaClearance[]): ActivityItem[] {
  return clearances.map((cl) => ({
    id: `clr-${cl.id}`,
    title: `LGA clearance — ${cl.status}`,
    type: 'clearance',
    time: new Date(cl.createdAt),
  }))
}

export function RecentActivity() {
  const payments = usePaymentHistory()
  const corrections = useMyCorrections()
  const clearance = useClearanceStatus()

  const isLoading = payments.isLoading || corrections.isLoading || clearance.isLoading

  const activities: ActivityItem[] = [
    ...fromPayments(payments.data ?? []),
    ...fromCorrections(corrections.data ?? []),
    ...fromClearance(clearance.data ?? []),
  ]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 5)

  return (
    <div className="card">
      <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="h-6 w-16 bg-gray-100 rounded-full" />
              <div className="flex-1 h-4 bg-gray-100 rounded" />
              <div className="h-4 w-16 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && activities.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-6">No activity yet.</p>
      )}

      {!isLoading && activities.length > 0 && (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize flex-shrink-0 ${typeColors[activity.type]}`}>
                {activity.type}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate capitalize">{activity.title}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">
                {formatDistanceToNow(activity.time, { addSuffix: true })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
