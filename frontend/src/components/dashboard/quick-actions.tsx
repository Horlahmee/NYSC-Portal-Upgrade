'use client'

import Link from 'next/link'
import { CreditCard, FileEdit, CheckSquare, Download } from 'lucide-react'

const actions = [
  { label: 'Make Payment', href: '/payment', icon: CreditCard, color: 'bg-green-50 text-green-700 hover:bg-green-100' },
  { label: 'Course Correction', href: '/course-correction', icon: FileEdit, color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
  { label: 'LGA Clearance', href: '/lga-clearance', icon: CheckSquare, color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' },
  { label: 'Download Cert', href: '/certificate', icon: Download, color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
]

export function QuickActions() {
  return (
    <div className="card">
      <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map(({ label, href, icon: Icon, color }) => (
          <Link
            key={label}
            href={href}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${color}`}
          >
            <Icon size={22} />
            <span className="text-xs font-medium text-center">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
