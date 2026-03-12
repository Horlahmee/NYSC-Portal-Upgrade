import type { Metadata } from 'next'
import { CourseCorrectionForm } from '@/components/dashboard/course-correction-form'
import { CorrectionHistory } from '@/components/dashboard/correction-history'

export const metadata: Metadata = { title: 'Course Correction' }

export default function CourseCorrectionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Course Correction</h1>
        <p className="text-gray-500 text-sm mt-1">Submit and track your correction requests</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CourseCorrectionForm />
        <CorrectionHistory />
      </div>
    </div>
  )
}
