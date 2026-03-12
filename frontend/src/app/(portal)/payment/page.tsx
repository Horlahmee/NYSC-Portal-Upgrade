import type { Metadata } from 'next'
import { PaymentHistory } from '@/components/dashboard/payment-history'
import { InitiatePayment } from '@/components/dashboard/initiate-payment'

export const metadata: Metadata = { title: 'Payment' }

export default function PaymentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your payments and view history</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PaymentHistory />
        </div>
        <div>
          <InitiatePayment />
        </div>
      </div>
    </div>
  )
}
