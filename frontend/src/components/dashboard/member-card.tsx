'use client'

import { MapPin, GraduationCap, Calendar, Phone } from 'lucide-react'
import { useAuthStore } from '@/store/auth'

export function MemberCard() {
  const user = useAuthStore((s) => s.user)

  const initial = user?.email?.[0]?.toUpperCase() ?? 'CM'
  const displayName = user?.email ?? 'Corps Member'
  const role = user?.role?.replace('_', ' ') ?? 'Corps Member'

  return (
    <div className="card space-y-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-nysc-green/10 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-nysc-green">
          {initial}
        </div>
        <h3 className="font-bold text-gray-900 mt-3 truncate">{displayName}</h3>
        <p className="text-nysc-green text-sm font-medium capitalize">{role}</p>
        <span className="badge-success mt-1 inline-block">
          {user?.isEmailVerified ? 'Verified' : 'Unverified'}
        </span>
      </div>

      <hr />

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Phone size={16} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Phone</p>
            <p className="font-medium">{user?.phone ?? '—'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <GraduationCap size={16} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Institution</p>
            <p className="font-medium text-gray-400 italic">Profile not loaded</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Posted State</p>
            <p className="font-medium text-gray-400 italic">Profile not loaded</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Batch</p>
            <p className="font-medium text-gray-400 italic">Profile not loaded</p>
          </div>
        </div>
      </div>
    </div>
  )
}
