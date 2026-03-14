'use client'

import { MapPin, GraduationCap, Calendar, Phone, BadgeCheck } from 'lucide-react'
import { useAuthStore } from '@/store/auth'

export function MemberCard() {
  const user = useAuthStore((s) => s.user)

  const initial = user?.email?.[0]?.toUpperCase() ?? 'C'
  const displayName = user?.email?.split('@')[0] ?? 'Corps Member'
  const role = user?.role?.replace('_', ' ') ?? 'Corps Member'
  const isVerified = user?.isEmailVerified ?? false

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
      {/* Header gradient banner */}
      <div className="relative h-20 bg-gradient-to-r from-nysc-green-deep to-nysc-green overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Avatar (overlapping banner) */}
      <div className="px-6 pb-5">
        <div className="-mt-9 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-nysc-green to-nysc-green-light text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-md ring-4 ring-white">
            {initial}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-black text-gray-900 capitalize leading-tight">{displayName}</h3>
          <p className="text-nysc-green text-xs font-semibold uppercase tracking-wide mt-0.5 capitalize">
            {role}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            {isVerified ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                <BadgeCheck size={11} />
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                Unverified
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-3">
          {[
            { icon: Phone, label: 'Phone', value: user?.phone ?? '—' },
            { icon: GraduationCap, label: 'Institution', value: null },
            { icon: MapPin, label: 'Posted State', value: null },
            { icon: Calendar, label: 'Batch', value: null },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2.5">
              <div className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={13} className="text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none">
                  {label}
                </p>
                <p
                  className={`text-sm font-semibold mt-0.5 ${
                    value ? 'text-gray-800' : 'text-gray-300 italic text-xs font-normal'
                  }`}
                >
                  {value ?? 'Not loaded'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
