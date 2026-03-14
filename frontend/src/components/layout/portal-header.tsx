'use client'

import { Bell, Menu } from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { useSidebarStore } from '@/store/sidebar'

export function PortalHeader() {
  const user = useAuthStore((s) => s.user)
  const toggleSidebar = useSidebarStore((s) => s.toggle)

  const initials = user?.email?.[0]?.toUpperCase() ?? 'CM'
  const displayName = user?.email ?? 'Corps Member'

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>
      <div className="hidden md:block" />
      <div className="flex items-center gap-3 md:gap-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-nysc-green text-white rounded-full flex items-center justify-center text-xs font-bold">
            {initials}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">{displayName}</span>
        </div>
      </div>
    </header>
  )
}
