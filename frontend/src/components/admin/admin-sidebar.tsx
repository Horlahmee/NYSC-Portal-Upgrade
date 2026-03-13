'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { LayoutDashboard, Users, FileEdit, CheckSquare, LogOut } from 'lucide-react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/members', label: 'Members', icon: Users },
  { href: '/admin/corrections', label: 'Corrections', icon: FileEdit },
  { href: '/admin/clearances', label: 'Clearances', icon: CheckSquare },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const clearAuth = useAuthStore((s) => s.clearAuth)

  async function handleLogout() {
    try { await api.post('/auth/logout') } catch { /* continue */ }
    clearAuth()
    router.push('/login')
  }

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen hidden md:flex">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-nysc-gold rounded-full flex items-center justify-center font-bold text-gray-900 text-sm">
            ADM
          </div>
          <div>
            <p className="font-bold text-sm leading-none">Admin Panel</p>
            <p className="text-xs text-gray-400 truncate max-w-[110px]">{user?.email ?? 'Admin'}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === href || pathname.startsWith(href + '/')
                ? 'bg-white/15 text-white'
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors w-full"
        >
          ← Corps Member Portal
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}
