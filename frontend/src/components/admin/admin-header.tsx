'use client'

import { Menu } from 'lucide-react'
import { useSidebarStore } from '@/store/sidebar'

export function AdminHeader() {
  const toggleSidebar = useSidebarStore((s) => s.toggle)

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center gap-4">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Admin Panel</p>
    </header>
  )
}
