'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { api } from '@/lib/api'
import { User } from '@/types'

/**
 * Like AuthHydrator but also enforces admin/superadmin role.
 * Redirects non-admins back to /dashboard.
 */
export function AdminHydrator() {
  const setUser = useAuthStore((s) => s.setUser)
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const router = useRouter()

  useEffect(() => {
    async function hydrate() {
      try {
        const { data: user } = await api.get<User>('/auth/me')
        if (user.role !== 'admin' && user.role !== 'superadmin') {
          router.replace('/dashboard')
          return
        }
        setUser(user)
      } catch {
        clearAuth()
        router.replace('/login')
      }
    }
    hydrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
