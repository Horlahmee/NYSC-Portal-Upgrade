'use client'

import { MapPin, GraduationCap, Calendar } from 'lucide-react'

export function MemberCard() {
  return (
    <div className="card space-y-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-nysc-green/10 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-nysc-green">
          CM
        </div>
        <h3 className="font-bold text-gray-900 mt-3">Corps Member Name</h3>
        <p className="text-nysc-green text-sm font-medium">LA/24A/1234</p>
        <span className="badge-success mt-1">Active</span>
      </div>

      <hr />

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <GraduationCap size={16} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Institution</p>
            <p className="font-medium">University of Lagos</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Posted State</p>
            <p className="font-medium">Lagos State</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Batch</p>
            <p className="font-medium">2024 Batch A — Stream 1</p>
          </div>
        </div>
      </div>
    </div>
  )
}
