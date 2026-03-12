import type { Metadata } from 'next'
import { ClearanceStatus } from '@/components/dashboard/clearance-status'

export const metadata: Metadata = { title: 'LGA Clearance' }

export default function LgaClearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">LGA Clearance</h1>
        <p className="text-gray-500 text-sm mt-1">Track your local government area clearance</p>
      </div>
      <ClearanceStatus />
    </div>
  )
}
