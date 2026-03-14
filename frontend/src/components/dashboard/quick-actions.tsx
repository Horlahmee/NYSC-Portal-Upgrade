'use client'

import Link from 'next/link'
import { CreditCard, FileEdit, CheckSquare, Download } from 'lucide-react'

const actions = [
  {
    label: 'Make Payment',
    href: '/payment',
    icon: CreditCard,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    border: 'border-emerald-100',
    hover: 'hover:bg-emerald-50',
  },
  {
    label: 'Course Correction',
    href: '/course-correction',
    icon: FileEdit,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    border: 'border-blue-100',
    hover: 'hover:bg-blue-50',
  },
  {
    label: 'LGA Clearance',
    href: '/lga-clearance',
    icon: CheckSquare,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    border: 'border-amber-100',
    hover: 'hover:bg-amber-50',
  },
  {
    label: 'Download Cert',
    href: '/certificate',
    icon: Download,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    border: 'border-violet-100',
    hover: 'hover:bg-violet-50',
  },
]

export function QuickActions() {
  return (
    <div className="card">
      <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map(({ label, href, icon: Icon, iconBg, iconColor, border, hover }) => (
          <Link
            key={label}
            href={href}
            className={`flex flex-col items-center gap-3 p-4 rounded-xl border ${border} bg-white ${hover} transition-all duration-150 group hover:-translate-y-0.5 hover:shadow-sm`}
          >
            <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon size={18} className={iconColor} />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
