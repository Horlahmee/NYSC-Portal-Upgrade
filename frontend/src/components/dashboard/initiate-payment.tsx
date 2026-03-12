'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function InitiatePayment() {
  const [loading, setLoading] = useState(false)

  async function handleGenerateRRR() {
    setLoading(true)
    // TODO: call payment API
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
  }

  return (
    <div className="card space-y-4">
      <h2 className="font-semibold text-gray-900">Generate Payment</h2>

      <div className="bg-nysc-green/5 border border-nysc-green/20 rounded-lg p-4 text-sm">
        <p className="text-gray-600 font-medium">Monthly Allawee</p>
        <p className="text-2xl font-bold text-nysc-green mt-1">₦33,000</p>
        <p className="text-xs text-gray-400 mt-1">June 2024</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Payment Type</label>
        <select className="input-field">
          <option>Monthly Allawee</option>
          <option>Clearance Fee</option>
          <option>Relocation Allowance</option>
        </select>
      </div>

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
          'Generate RRR'
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Powered by Remita. Your RRR will be valid for 72 hours.
      </p>
    </div>
  )
}
