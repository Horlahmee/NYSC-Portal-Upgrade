'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import { api } from '@/lib/api'
import { CourseCorrection, CorrectionStatus } from '@/types'
import { exportToCsv } from '@/lib/csv'

function useCorrections() {
  return useQuery({
    queryKey: ['admin', 'corrections'],
    queryFn: () => api.get<CourseCorrection[]>('/admin/corrections').then((r) => r.data),
  })
}

function useReviewCorrection() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status, reviewNote }: { id: string; status: string; reviewNote?: string }) =>
      api.patch(`/admin/corrections/${id}/review`, { status, reviewNote }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'corrections'] }),
  })
}

const statusIcon: Record<CorrectionStatus, React.ReactNode> = {
  pending: <Clock size={14} className="text-yellow-500" />,
  under_review: <Clock size={14} className="text-blue-500" />,
  approved: <CheckCircle size={14} className="text-green-500" />,
  rejected: <XCircle size={14} className="text-red-500" />,
}

const statusLabel: Record<CorrectionStatus, string> = {
  pending: 'Pending',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
}

export function CorrectionsQueue() {
  const { data, isLoading } = useCorrections()
  const review = useReviewCorrection()
  const [selected, setSelected] = useState<CourseCorrection | null>(null)
  const [reviewNote, setReviewNote] = useState('')
  const [filter, setFilter] = useState<CorrectionStatus | 'all'>('all')

  const filtered = (data ?? []).filter((c) => filter === 'all' || c.status === filter)

  function openReview(c: CourseCorrection) {
    setSelected(c)
    setReviewNote(c.reviewNote ?? '')
  }

  function submitReview(status: string) {
    if (!selected) return
    review.mutate({ id: selected.id, status, reviewNote }, { onSuccess: () => setSelected(null) })
  }

  return (
    <div className="space-y-4">
      {/* Filter + Export */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'pending', 'under_review', 'approved', 'rejected'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                filter === s
                  ? 'bg-nysc-green text-white border-nysc-green'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s === 'all' ? 'All' : statusLabel[s]}
            </button>
          ))}
        </div>
        {data && data.length > 0 && (
          <button
            onClick={() =>
              exportToCsv(
                data.map((c) => ({
                  ID: c.id,
                  MemberID: c.memberId,
                  Type: c.correctionType,
                  OldValue: c.oldValue,
                  NewValue: c.newValue,
                  Status: c.status,
                  CreatedAt: c.createdAt,
                })),
                'corrections'
              )
            }
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Export CSV
          </button>
        )}
      </div>

      <div className="card">
        {isLoading && (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => <div key={i} className="h-12 bg-gray-100 rounded" />)}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No correction requests found.</p>
        )}

        {!isLoading && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Old → New</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Submitted</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-800 capitalize">{c.correctionType.replace(/_/g, ' ')}</td>
                    <td className="py-3 text-gray-500 text-xs">
                      <span className="line-through">{c.oldValue}</span>
                      <span className="mx-1.5">→</span>
                      <span className="text-gray-800">{c.newValue}</span>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1 text-xs">
                        {statusIcon[c.status]}
                        {statusLabel[c.status]}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400 text-xs">
                      {new Date(c.createdAt).toLocaleDateString('en-NG')}
                    </td>
                    <td className="py-3">
                      {(c.status === 'pending' || c.status === 'under_review') && (
                        <button
                          onClick={() => openReview(c)}
                          className="text-xs text-nysc-green font-medium hover:underline"
                        >
                          Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-base font-bold text-gray-900">Review Correction</h2>
            <div className="text-sm space-y-1">
              <p><span className="text-gray-500">Type:</span> <strong className="capitalize">{selected.correctionType.replace(/_/g, ' ')}</strong></p>
              <p><span className="text-gray-500">Old value:</span> {selected.oldValue}</p>
              <p><span className="text-gray-500">New value:</span> {selected.newValue}</p>
              {selected.reason && <p><span className="text-gray-500">Reason:</span> {selected.reason}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Review Note (optional)</label>
              <textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                rows={3}
                className="input-field resize-none"
                placeholder="Add a note for the member..."
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => submitReview('approved')}
                disabled={review.isPending}
                className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1.5 bg-green-600 border-green-600 hover:bg-green-700"
              >
                <CheckCircle size={15} /> Approve
              </button>
              <button
                onClick={() => submitReview('rejected')}
                disabled={review.isPending}
                className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1.5 bg-red-600 border-red-600 hover:bg-red-700"
              >
                <XCircle size={15} /> Reject
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
