'use client'

const corrections = [
  { id: 1, type: 'Name', oldValue: 'John Doe', newValue: 'John Doe Jr.', status: 'approved', date: '2024-05-10' },
  { id: 2, type: 'Course', oldValue: 'Computer Science', newValue: 'Computer Engineering', status: 'pending', date: '2024-06-01' },
]

const statusBadge: Record<string, string> = {
  approved: 'badge-success',
  pending: 'badge-warning',
  rejected: 'badge-danger',
  under_review: 'badge-info',
}

export function CorrectionHistory() {
  return (
    <div className="card">
      <h2 className="font-semibold text-gray-900 mb-4">Correction History</h2>
      {corrections.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No correction requests yet.</p>
      ) : (
        <div className="space-y-3">
          {corrections.map((c) => (
            <div key={c.id} className="border border-gray-100 rounded-lg p-3 text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">{c.type}</span>
                <span className={statusBadge[c.status]}>{c.status}</span>
              </div>
              <p className="text-gray-400 text-xs">
                <span className="line-through">{c.oldValue}</span> → <span className="text-gray-700">{c.newValue}</span>
              </p>
              <p className="text-gray-400 text-xs mt-1">{c.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
