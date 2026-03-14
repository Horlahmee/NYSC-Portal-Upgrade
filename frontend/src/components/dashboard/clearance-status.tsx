'use client'

import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react'
import { useClearanceStatus } from '@/lib/queries'

const statusConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  cleared: {
    icon: <CheckCircle size={20} className="text-green-500" />,
    color: 'text-green-600',
    label: 'Cleared',
  },
  pending: {
    icon: <Clock size={20} className="text-yellow-500" />,
    color: 'text-yellow-600',
    label: 'Pending',
  },
  query: {
    icon: <AlertCircle size={20} className="text-red-500" />,
    color: 'text-red-600',
    label: 'Query Raised',
  },
  withheld: {
    icon: <XCircle size={20} className="text-red-600" />,
    color: 'text-red-700',
    label: 'Withheld',
  },
}

export function ClearanceStatus() {
  const { data: clearances, isLoading } = useClearanceStatus()

  const overallStatus = clearances?.[0]?.status ?? 'not started'
  const cfg = statusConfig[overallStatus] ?? statusConfig['pending']

  return (
    <div className="card max-w-2xl space-y-6">
      <div>
        <h2 className="font-semibold text-gray-900 mb-1">LGA Clearance Status</h2>
        <p className="text-sm text-gray-500">
          Your current clearance status with the Local Government Area inspector.
        </p>
      </div>

      {/* Overall status banner */}
      {!isLoading && (
        <div className={`flex items-center gap-3 rounded-lg px-4 py-3 border ${
          overallStatus === 'cleared'
            ? 'bg-green-50 border-green-200'
            : overallStatus === 'query' || overallStatus === 'withheld'
            ? 'bg-red-50 border-red-200'
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          {cfg.icon}
          <div>
            <p className={`font-semibold text-sm ${cfg.color}`}>{cfg.label}</p>
            {clearances?.[0]?.queryReason && (
              <p className="text-xs text-gray-600 mt-0.5">{clearances[0].queryReason}</p>
            )}
            {clearances?.[0]?.notes && (
              <p className="text-xs text-gray-500 mt-0.5">{clearances[0].notes}</p>
            )}
          </div>
          {clearances?.[0]?.clearedAt && (
            <span className="ml-auto text-xs text-gray-400 flex-shrink-0">
              {new Date(clearances[0].clearedAt).toLocaleDateString('en-NG')}
            </span>
          )}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-16 bg-gray-100 rounded-lg" />
          <div className="h-12 bg-gray-100 rounded-lg" />
        </div>
      )}

      {/* No clearance record yet */}
      {!isLoading && (!clearances || clearances.length === 0) && (
        <p className="text-sm text-gray-400 text-center py-4">
          No clearance record found. Your LGA officer will create one after your inspection visit.
        </p>
      )}

      {/* All clearance records */}
      {!isLoading && clearances && clearances.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            All Records
          </h3>
          <div className="space-y-3">
            {clearances.map((c) => {
              const s = statusConfig[c.status] ?? statusConfig['pending']
              return (
                <div key={c.id} className="flex items-start gap-4 pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex-shrink-0 mt-0.5">{s.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">LGA #{c.lgaId}</p>
                    {c.queryReason && (
                      <p className="text-xs text-red-500 mt-0.5">Query: {c.queryReason}</p>
                    )}
                    {c.notes && (
                      <p className="text-xs text-gray-500 mt-0.5">{c.notes}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {c.createdAt && <>Submitted {new Date(c.createdAt).toLocaleDateString('en-NG')}</>}
                    </p>
                  </div>
                  <span className={`text-xs font-medium capitalize flex-shrink-0 ${s.color}`}>
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
