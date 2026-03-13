import type { Metadata } from 'next'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { MemberCard } from '@/components/dashboard/member-card'
import { DashboardGreeting } from '@/components/dashboard/dashboard-greeting'

export const metadata: Metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardGreeting />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DashboardStats />
          <QuickActions />
          <RecentActivity />
        </div>
        <div>
          <MemberCard />
        </div>
      </div>
    </div>
  )
}
