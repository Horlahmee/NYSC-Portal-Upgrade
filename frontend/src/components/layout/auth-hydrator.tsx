'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { User } from '@/types'

/**
 * Mounts invisibly inside the portal layout.
 * On every page load it hits GET /auth/me to:
 *   1. Confirm the access token is still valid (or let the 401 interceptor
 *      silently refresh it and retry).
 *   2. Refresh the user object in the store with the latest server data.
 * If both access-token and refresh-token are gone, redirect to /login.
 */
export function AuthHydrator() {
  const setUser = useAuthStore((s) => s.setUser)
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const router = useRouter()

  useEffect(() => {
    async function hydrate() {
      try {
        const { data: user } = await api.get<User>('/auth/me')
        setUser(user)
      } catch {
        clearAuth()
        router.replace('/login')
      }
    }
    hydrate()
    // Run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
