'use client'

import { formatDistanceToNow } from 'date-fns'

const activities = [
  { id: 1, title: 'Monthly allawee payment confirmed', type: 'payment', time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { id: 2, title: 'Course correction request submitted', type: 'correction', time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  { id: 3, title: 'LGA clearance query raised', type: 'clearance', time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
  { id: 4, title: 'Profile updated successfully', type: 'profile', time: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
]

const typeColors: Record<string, string> = {
  payment: 'bg-green-100 text-green-700',
  correction: 'bg-blue-100 text-blue-700',
  clearance: 'bg-yellow-100 text-yellow-700',
  profile: 'bg-gray-100 text-gray-700',
}

export function RecentActivity() {
  return (
    <div className="card">
      <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${typeColors[activity.type]}`}>
              {activity.type}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 truncate">{activity.title}</p>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">
              {formatDistanceToNow(activity.time, { addSuffix: true })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
