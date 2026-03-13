'use client'

import { useState } from 'react'
import { Loader2, Copy, CheckCheck } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

const PAYMENT_TYPES: { label: string; value: string; amount: number }[] = [
  { label: 'Monthly Allawee', value: 'Monthly Allawee', amount: 33000 },
  { label: 'Clearance Fee', value: 'Clearance Fee', amount: 5000 },
  { label: 'Relocation Allowance', value: 'Relocation Allowance', amount: 20000 },
]

export function InitiatePayment() {
  const [selectedType, setSelectedType] = useState(0)
  const [loading, setLoading] = useState(false)
  const [rrr, setRrr] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const selected = PAYMENT_TYPES[selectedType]

  async function handleGenerateRRR() {
    setLoading(true)
    setError(null)
    setRrr(null)
    try {
      const { data } = await api.post<{ rrr: string; paymentId: string; amount: number }>(
        '/payments/generate-rrr',
        { amount: selected.amount, paymentType: selected.value }
      )
      setRrr(data.rrr)
      // Refresh payment history table
      await queryClient.invalidateQueries({ queryKey: ['payments', 'history'] })
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      setError(typeof msg === 'string' ? msg : 'Failed to generate RRR. Try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    if (!rrr) return
    await navigator.clipboard.writeText(rrr)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card space-y-4">
      <h2 className="font-semibold text-gray-900">Generate Payment</h2>

      <div className="bg-nysc-green/5 border border-nysc-green/20 rounded-lg p-4 text-sm">
        <p className="text-gray-600 font-medium">{selected.label}</p>
        <p className="text-2xl font-bold text-nysc-green mt-1">
          ₦{selected.amount.toLocaleString()}
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Payment Type</label>
        <select
          className="input-field"
          value={selectedType}
          onChange={(e) => { setSelectedType(Number(e.target.value)); setRrr(null); setError(null) }}
        >
          {PAYMENT_TYPES.map((t, i) => (
            <option key={t.value} value={i}>{t.label}</option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {rrr && (
        <div className="bg-nysc-green/5 border border-nysc-green/30 rounded-lg p-3 space-y-1">
          <p className="text-xs text-gray-500 font-medium">Your RRR</p>
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono font-bold text-nysc-green text-lg tracking-wider">{rrr}</p>
            <button onClick={handleCopy} className="text-gray-400 hover:text-nysc-green flex-shrink-0">
              {copied ? <CheckCheck size={16} className="text-green-600" /> : <Copy size={16} />}
            </button>
          </div>
          <p className="text-xs text-gray-400">
            Use this RRR to complete payment on Remita. Valid for 72 hours.
          </p>
        </div>
      )}

      <button
        onClick={handleGenerateRRR}
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Generating RRR...
          </span>
        ) : (
          rrr ? 'Generate New RRR' : 'Generate RRR'
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Powered by Remita. Your RRR will be valid for 72 hours.
      </p>
    </div>
  )
}
