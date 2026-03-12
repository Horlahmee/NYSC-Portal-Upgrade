'use client'

const payments = [
  { id: 1, rrr: 'RRR123456789', type: 'Monthly Allawee', amount: 33000, status: 'successful', date: '2024-06-01' },
  { id: 2, rrr: 'RRR987654321', type: 'Monthly Allawee', amount: 33000, status: 'successful', date: '2024-05-01' },
  { id: 3, rrr: 'RRR456789123', type: 'Monthly Allawee', amount: 33000, status: 'pending', date: '2024-04-01' },
]

const statusBadge: Record<string, string> = {
  successful: 'badge-success',
  pending: 'badge-warning',
  failed: 'badge-danger',
}

export function PaymentHistory() {
  return (
    <div className="card">
      <h2 className="font-semibold text-gray-900 mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
              <th className="pb-3 font-medium">RRR</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="py-3 font-mono text-xs text-gray-600">{p.rrr}</td>
                <td className="py-3 text-gray-700">{p.type}</td>
                <td className="py-3 font-medium">₦{p.amount.toLocaleString()}</td>
                <td className="py-3 text-gray-500">{p.date}</td>
                <td className="py-3">
                  <span className={statusBadge[p.status]}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
