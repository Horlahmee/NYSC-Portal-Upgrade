import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-nysc-green text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-nysc-gold rounded-full flex items-center justify-center font-bold text-nysc-green text-sm">
                NYSC
              </div>
              <div>
                <p className="font-bold text-sm leading-none">NYSC Portal</p>
                <p className="text-xs text-green-200">National Youth Service Corps</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/about" className="hover:text-nysc-gold transition-colors">About</Link>
              <Link href="/contact" className="hover:text-nysc-gold transition-colors">Contact</Link>
              <Link href="/auth/login" className="btn-secondary !text-nysc-green text-sm py-2 px-4">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-nysc-green to-nysc-green-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to the NYSC Portal
          </h1>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Manage your National Youth Service Corps journey — registration,
            payments, clearance, and more — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-nysc-gold text-nysc-green-dark font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Register Now
            </Link>
            <Link
              href="/auth/login"
              className="bg-white/10 border border-white/30 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              Login to Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Portal Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-nysc-green/10 rounded-lg flex items-center justify-center mb-4 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nysc-green text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-green-200">
          <p>© {new Date().getFullYear()} National Youth Service Corps. All rights reserved.</p>
          <p className="mt-1">Plot 416, Tigris Crescent, Maitama, Abuja, Nigeria</p>
        </div>
      </footer>
    </main>
  )
}

const features = [
  {
    icon: '📋',
    title: 'Registration',
    description: 'Complete your NYSC registration online with document upload and verification.',
  },
  {
    icon: '💳',
    title: 'Payment',
    description: 'Pay your monthly allawee and other fees securely via Remita.',
  },
  {
    icon: '✏️',
    title: 'Course Correction',
    description: 'Submit requests to correct personal information or course details.',
  },
  {
    icon: '✅',
    title: 'LGA Clearance',
    description: 'Track and manage your local government area clearance status.',
  },
  {
    icon: '🏛️',
    title: 'Disciplinary Cases',
    description: 'View and respond to any disciplinary cases filed against you.',
  },
  {
    icon: '🔔',
    title: 'Notifications',
    description: 'Receive real-time updates via email and SMS for all activities.',
  },
]
