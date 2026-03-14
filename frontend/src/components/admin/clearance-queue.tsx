'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { LgaClearance, ClearanceStatus } from '@/types'
import { exportToCsv } from '@/lib/csv'

function useClearances() {
  return useQuery({
    queryKey: ['admin', 'clearances'],
    queryFn: () => api.get<LgaClearance[]>('/admin/clearances').then((r) => r.data),
  })
}

function useUpdateClearance() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status, notes, queryReason }: { id: string; status: string; notes?: string; queryReason?: string }) =>
      api.patch(`/admin/clearances/${id}`, { status, notes, queryReason }),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['admin', 'clearances'] })
      const label = variables.status === 'cleared' ? 'cleared' : variables.status === 'query' ? 'queried' : 'withheld'
      toast.success(`Clearance ${label} successfully.`)
    },
    onError: () => toast.error('Failed to update clearance. Please try again.'),
  })
}

const statusConfig: Record<ClearanceStatus, { icon: React.ReactNode; label: string; color: string }> = {
  pending: { icon: <Clock size={14} />, label: 'Pending', color: 'text-yellow-600' },
  cleared: { icon: <CheckCircle size={14} />, label: 'Cleared', color: 'text-green-600' },
  query: { icon: <AlertCircle size={14} />, label: 'Query', color: 'text-orange-600' },
  withheld: { icon: <XCircle size={14} />, label: 'Withheld', color: 'text-red-600' },
}

export function ClearanceQueue() {
  const { data, isLoading } = useClearances()
  const update = useUpdateClearance()
  const [selected, setSelected] = useState<LgaClearance | null>(null)
  const [notes, setNotes] = useState('')
  const [queryReason, setQueryReason] = useState('')
  const [filter, setFilter] = useState<ClearanceStatus | 'all'>('all')

  const filtered = (data ?? []).filter((c) => filter === 'all' || c.status === filter)

  function openAction(c: LgaClearance) {
    setSelected(c)
    setNotes(c.notes ?? '')
    setQueryReason(c.queryReason ?? '')
  }

  function submitAction(status: string) {
    if (!selected) return
    update.mutate({ id: selected.id, status, notes, queryReason }, { onSuccess: () => setSelected(null) })
  }

  return (
    <div className="space-y-4">
      {/* Filter + Export */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'pending', 'cleared', 'query', 'withheld'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                filter === s
                  ? 'bg-nysc-green text-white border-nysc-green'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s === 'all' ? 'All' : statusConfig[s].label}
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
                  LGAID: c.lgaId,
                  Status: c.status,
                  QueryReason: c.queryReason ?? '',
                  Notes: c.notes ?? '',
                  ClearedAt: c.clearedAt ?? '',
                  CreatedAt: c.createdAt,
                })),
                'clearances'
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
          <p className="text-sm text-gray-400 text-center py-8">No clearance records found.</p>
        )}

        {!isLoading && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Member ID</th>
                  <th className="pb-3 font-medium">LGA ID</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Notes</th>
                  <th className="pb-3 font-medium">Updated</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((c) => {
                  const cfg = statusConfig[c.status]
                  return (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="py-3 text-xs text-gray-500 font-mono">{c.memberId.slice(0, 8)}…</td>
                      <td className="py-3 text-gray-600">{c.lgaId}</td>
                      <td className="py-3">
                        <span className={`flex items-center gap-1 text-xs font-medium ${cfg.color}`}>
                          {cfg.icon}
                          {cfg.label}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-gray-400">{c.queryReason || c.notes || '—'}</td>
                      <td className="py-3 text-xs text-gray-400">
                        {c.updatedAt ? new Date(c.updatedAt).toLocaleDateString('en-NG') : '—'}
                      </td>
                      <td className="py-3">
                        {(c.status === 'pending' || c.status === 'query') && (
                          <button
                            onClick={() => openAction(c)}
                            className="text-xs text-nysc-green font-medium hover:underline"
                          >
                            Update
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Action modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-base font-bold text-gray-900">Update Clearance</h2>
            <p className="text-xs text-gray-500">Member: <span className="font-mono text-gray-700">{selected.memberId}</span></p>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Query Reason (if raising a query)</label>
              <input
                value={queryReason}
                onChange={(e) => setQueryReason(e.target.value)}
                className="input-field"
                placeholder="Reason for query or withhold..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="input-field resize-none"
                placeholder="Internal notes..."
              />
            </div>

            <div className="flex gap-2 pt-1 flex-wrap">
              <button
                onClick={() => submitAction('cleared')}
                disabled={update.isPending}
                className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1.5 bg-green-600 border-green-600 hover:bg-green-700 min-w-[90px]"
              >
                <CheckCircle size={14} /> Clear
              </button>
              <button
                onClick={() => submitAction('query')}
                disabled={update.isPending}
                className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1.5 bg-orange-500 border-orange-500 hover:bg-orange-600 min-w-[90px]"
              >
                <AlertCircle size={14} /> Query
              </button>
              <button
                onClick={() => submitAction('withheld')}
                disabled={update.isPending}
                className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1.5 bg-red-600 border-red-600 hover:bg-red-700 min-w-[90px]"
              >
                <XCircle size={14} /> Withhold
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
