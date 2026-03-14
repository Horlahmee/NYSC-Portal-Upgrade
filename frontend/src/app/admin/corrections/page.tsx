import type { Metadata } from 'next'
import { CorrectionsQueue } from '@/components/admin/corrections-queue'

export const metadata: Metadata = { title: 'Admin — Corrections' }

export default function AdminCorrectionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Course Corrections</h1>
        <p className="text-gray-500 text-sm mt-1">Review and approve correction requests from corps members</p>
      </div>
      <CorrectionsQueue />
    </div>
  )
}
