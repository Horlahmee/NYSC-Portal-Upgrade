'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

  return (
    <aside className="w-64 bg-nysc-green text-white flex flex-col min-h-screen hidden md:flex">
      {/* Logo */}
      <div className="p-6 border-b border-green-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-nysc-gold rounded-full flex items-center justify-center font-bold text-nysc-green text-sm">
            NYSC
          </div>
          <div>
            <p className="font-bold text-sm leading-none">NYSC Portal</p>
            <p className="text-xs text-green-300">Corps Member</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
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
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-green-200 hover:bg-white/10 hover:text-white transition-colors w-full">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}
