'use client'

import { Bell, Menu, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { useSidebarStore } from '@/store/sidebar'

export function PortalHeader() {
  const user = useAuthStore((s) => s.user)
  const toggleSidebar = useSidebarStore((s) => s.toggle)

  const initials = user?.email?.[0]?.toUpperCase() ?? 'CM'
  const displayName = user?.email?.split('@')[0] ?? 'Corps Member'

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {/* Desktop spacer */}
      <div className="hidden md:block" />
      <div className="flex items-center gap-3 md:gap-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* User badge */}
        <button className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors group">
          <div className="w-8 h-8 bg-gradient-to-br from-nysc-green to-nysc-green-light text-white rounded-xl flex items-center justify-center text-xs font-bold shadow-sm">
            {initials}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-gray-800 leading-none capitalize">
              {displayName}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">Corps Member</p>
          </div>
          <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>
  )
}
