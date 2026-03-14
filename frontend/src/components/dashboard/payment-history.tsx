'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { usePaymentHistory } from '@/lib/queries'
import { api } from '@/lib/api'

const statusBadge: Record<string, string> = {
  successful: 'badge-success',
  pending: 'badge-warning',
  failed: 'badge-danger',
  reversed: 'badge-danger',
}

export function PaymentHistory() {
  const { data: payments, isLoading } = usePaymentHistory()
  const queryClient = useQueryClient()
  const [verifying, setVerifying] = useState<string | null>(null)

  async function handleVerify(rrr: string) {
    setVerifying(rrr)
    try {
      await api.get(`/payments/verify/${rrr}`)
      await queryClient.invalidateQueries({ queryKey: ['payments', 'history'] })
    } catch {
      // Status stays as-is; user can retry
    } finally {
      setVerifying(null)
    }
  }

  return (
    <div className="card">
      <h2 className="font-semibold text-gray-900 mb-4">Payment History</h2>

      {isLoading && (
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-100 rounded" />
          ))}
        </div>
      )}

      {!isLoading && (!payments || payments.length === 0) && (
        <p className="text-sm text-gray-400 text-center py-8">No payments yet.</p>
      )}

      {!isLoading && payments && payments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">RRR</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-gray-600">{p.rrr ?? '—'}</td>
                  <td className="py-3 text-gray-700 capitalize">{p.paymentType}</td>
                  <td className="py-3 font-medium tabular">₦{Number(p.amount).toLocaleString()}</td>
                  <td className="py-3 text-gray-500">
                    {new Date(p.createdAt ?? p.initiatedAt).toLocaleDateString('en-NG')}
                  </td>
                  <td className="py-3">
                    <span className={statusBadge[p.status] ?? 'badge-warning'}>{p.status}</span>
                  </td>
                  <td className="py-3">
                    {p.status === 'pending' && p.rrr && (
                      <button
                        onClick={() => handleVerify(p.rrr!)}
                        disabled={verifying === p.rrr}
                        className="text-xs text-nysc-green hover:underline flex items-center gap-1"
                      >
                        <RefreshCw size={12} className={verifying === p.rrr ? 'animate-spin' : ''} />
                        Verify
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
  )
}
