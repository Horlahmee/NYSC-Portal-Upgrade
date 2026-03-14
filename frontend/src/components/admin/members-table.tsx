'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { api } from '@/lib/api'
import { User } from '@/types'
import { useDebounce } from '@/lib/use-debounce'

interface MembersResponse {
  users: User[]
  total: number
  page: number
  limit: number
  totalPages: number
}

function useMembers(search: string, page: number) {
  return useQuery({
    queryKey: ['admin', 'members', search, page],
    queryFn: () =>
      api
        .get<MembersResponse>('/admin/members', { params: { search: search || undefined, page, limit: 20 } })
        .then((r) => r.data),
    placeholderData: (prev) => prev,
  })
}

const roleBadge: Record<string, string> = {
  corps_member: 'bg-blue-100 text-blue-700',
  lga_officer: 'bg-purple-100 text-purple-700',
  state_coordinator: 'bg-indigo-100 text-indigo-700',
  admin: 'bg-red-100 text-red-700',
  superadmin: 'bg-gray-900 text-white',
}

export function MembersTable() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search, 350)
  const { data, isLoading } = useMembers(debouncedSearch, page)

  return (
    <div className="card space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search by email or phone..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          className="input-field pl-9"
        />
      </div>

      {/* Table */}
      {isLoading && (
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-10 bg-gray-100 rounded" />)}
        </div>
      )}

      {!isLoading && data && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Phone</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Verified</th>
                  <th className="pb-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="py-3 text-gray-800">{u.email}</td>
                    <td className="py-3 text-gray-500">{u.phone}</td>
                    <td className="py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${roleBadge[u.role] ?? 'bg-gray-100 text-gray-600'}`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={u.isEmailVerified ? 'text-green-600 text-xs font-medium' : 'text-gray-400 text-xs'}>
                        {u.isEmailVerified ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400 text-xs">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-NG') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-2 text-sm text-gray-500">
            <p>{data.total} member{data.total !== 1 ? 's' : ''} total</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs"
              >
                Previous
              </button>
              <span className="text-xs">Page {data.page} of {data.totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page >= data.totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
