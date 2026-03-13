'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import {
  LayoutDashboard,
  CreditCard,
  FileEdit,
  CheckSquare,
  AlertTriangle,
  Bell,
  User,
  LogOut,
  X,
} from 'lucide-react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useSidebarStore } from '@/store/sidebar'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/payment', label: 'Payment', icon: CreditCard },
  { href: '/course-correction', label: 'Course Correction', icon: FileEdit },
  { href: '/lga-clearance', label: 'LGA Clearance', icon: CheckSquare },
  { href: '/disciplinary', label: 'Disciplinary', icon: AlertTriangle },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/profile', label: 'My Profile', icon: User },
]

export function PortalSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const isOpen = useSidebarStore((s) => s.isOpen)
  const close = useSidebarStore((s) => s.close)

  async function handleLogout() {
    try { await api.post('/auth/logout') } catch { /* continue */ }
    clearAuth()
    router.push('/login')
  }

  const sidebarContent = (
    <aside className="w-64 bg-nysc-green text-white flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-green-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-nysc-gold rounded-full flex items-center justify-center font-bold text-nysc-green text-sm">
            NYSC
          </div>
          <div>
            <p className="font-bold text-sm leading-none">NYSC Portal</p>
            <p className="text-xs text-green-300 truncate max-w-[110px]">
              {user?.email ?? 'Corps Member'}
            </p>
          </div>
        </div>
        <button onClick={close} className="md:hidden p-1 rounded hover:bg-white/10" aria-label="Close navigation">
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={close}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === href || pathname.startsWith(href + '/')
                ? 'bg-white/20 text-white'
                : 'text-green-200 hover:bg-white/10 hover:text-white'
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-green-200 hover:bg-white/10 hover:text-white transition-colors w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden md:flex w-64 min-h-screen flex-shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile: overlay drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={close}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="relative z-50 flex flex-col w-64 min-h-screen shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
