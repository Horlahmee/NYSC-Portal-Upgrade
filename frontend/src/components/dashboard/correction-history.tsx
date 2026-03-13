'use client'

import { useMyCorrections } from '@/lib/queries'

const statusBadge: Record<string, string> = {
  approved: 'badge-success',
  pending: 'badge-warning',
  rejected: 'badge-danger',
  under_review: 'badge-info',
}

export function CorrectionHistory() {
  const { data: corrections, isLoading } = useMyCorrections()

  return (
    <div className="card">
      <h2 className="font-semibold text-gray-900 mb-4">Correction History</h2>

      {isLoading && (
        <div className="space-y-3 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-3 space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-100 rounded" />
                <div className="h-4 w-16 bg-gray-100 rounded-full" />
              </div>
              <div className="h-3 w-48 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && (!corrections || corrections.length === 0) && (
        <p className="text-sm text-gray-400 text-center py-8">No correction requests yet.</p>
      )}

      {!isLoading && corrections && corrections.length > 0 && (
        <div className="space-y-3">
          {corrections.map((c) => (
            <div key={c.id} className="border border-gray-100 rounded-lg p-3 text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700 capitalize">{c.correctionType.replace('_', ' ')}</span>
                <span className={statusBadge[c.status] ?? 'badge-warning'}>{c.status.replace('_', ' ')}</span>
              </div>
              <p className="text-gray-400 text-xs">
                <span className="line-through">{c.oldValue}</span>
                {' → '}
                <span className="text-gray-700">{c.newValue}</span>
              </p>
              {c.reviewNote && (
                <p className="text-xs text-blue-600 mt-1 italic">Note: {c.reviewNote}</p>
              )}
              <p className="text-gray-400 text-xs mt-1">
                {new Date(c.createdAt).toLocaleDateString('en-NG')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
