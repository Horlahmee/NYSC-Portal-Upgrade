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
} from 'lucide-react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth'

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

  const initial = user?.email?.[0]?.toUpperCase() ?? 'C'
  const displayEmail = user?.email ?? 'Corps Member'

  async function handleLogout() {
    try {
      await api.post('/auth/logout')
    } catch {
      // Proceed with local logout even if the server call fails
    } finally {
      clearAuth()
      router.push('/login')
    }
  }

  return (
    <aside
      className="w-64 flex flex-col min-h-screen hidden md:flex shrink-0"
      style={{ background: 'linear-gradient(180deg, #002800 0%, #004500 60%, #005000 100%)' }}
    >
      {/* Logo / user area */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-nysc-gold rounded-xl flex items-center justify-center font-black text-nysc-green-deep text-xs shrink-0">
            NYSC
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm text-white leading-none">NYSC Portal</p>
            <p className="text-[11px] text-green-400 truncate mt-0.5">{displayEmail}</p>
          </div>
        </div>
      </div>

      {/* Nav section label */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] text-green-600 font-bold uppercase tracking-[0.18em]">
          Menu
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5 pb-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative',
                isActive
                  ? 'bg-white/15 text-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-0.5 before:bg-nysc-gold before:rounded-full'
                  : 'text-green-300 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon
                size={17}
                className={clsx(
                  'shrink-0 transition-colors',
                  isActive ? 'text-nysc-gold' : 'text-green-400 group-hover:text-green-200'
                )}
              />
              <span className="flex-1">{label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-nysc-gold rounded-full shrink-0" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Avatar strip + logout */}
      <div className="p-3 border-t border-white/10 space-y-1">
        {/* User info strip */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5">
          <div className="w-7 h-7 bg-nysc-green-light rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0">
            {initial}
          </div>
          <p className="text-xs text-green-200 truncate flex-1">{displayEmail}</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-green-400 hover:bg-white/10 hover:text-white transition-all w-full"
        >
          <LogOut size={17} className="shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
