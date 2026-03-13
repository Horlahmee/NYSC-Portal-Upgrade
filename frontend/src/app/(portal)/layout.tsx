import { PortalSidebar } from '@/components/layout/portal-sidebar'
import { PortalHeader } from '@/components/layout/portal-header'
import { AuthHydrator } from '@/components/layout/auth-hydrator'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AuthHydrator />
      <PortalSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <PortalHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
