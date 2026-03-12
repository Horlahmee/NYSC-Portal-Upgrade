'use client'

import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

const steps = [
  { label: 'PPA Confirmation', status: 'cleared', detail: 'Confirmed by PPA on May 15, 2024' },
  { label: 'LGA Inspector Visit', status: 'cleared', detail: 'Visited on May 20, 2024' },
  { label: 'LGA Secretary Sign-off', status: 'pending', detail: 'Awaiting review' },
  { label: 'State Coordinator Approval', status: 'pending', detail: 'Not yet initiated' },
]

const icons: Record<string, React.ReactNode> = {
  cleared: <CheckCircle size={20} className="text-green-500" />,
  pending: <Clock size={20} className="text-yellow-500" />,
  query: <AlertCircle size={20} className="text-red-500" />,
}

export function ClearanceStatus() {
  return (
    <div className="card max-w-2xl">
      <h2 className="font-semibold text-gray-900 mb-6">LGA Clearance Progress</h2>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-0.5">{icons[step.status]}</div>
            <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
              <p className="font-medium text-gray-800 text-sm">{step.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{step.detail}</p>
            </div>
            <span className={`text-xs font-medium capitalize flex-shrink-0 ${
              step.status === 'cleared' ? 'text-green-600' :
              step.status === 'query' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {step.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
