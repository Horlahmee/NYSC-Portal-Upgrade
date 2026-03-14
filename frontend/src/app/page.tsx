import Link from 'next/link'
import {
  Shield,
  CreditCard,
  FileEdit,
  CheckSquare,
  AlertTriangle,
  Bell,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-nysc-green-deep/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-nysc-gold rounded-xl flex items-center justify-center font-black text-nysc-green-deep text-[10px] shrink-0">
                NYSC
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-none">NYSC Portal</p>
                <p className="text-[10px] text-green-300 leading-none mt-0.5">
                  National Youth Service Corps
                </p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <Link href="/about" className="text-green-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-green-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link
                href="/login"
                className="bg-nysc-gold text-nysc-green-deep font-bold px-5 py-2 rounded-lg hover:bg-yellow-300 transition-all shadow-sm text-sm"
              >
                Sign In
              </Link>
            </nav>
            {/* Mobile sign in */}
            <Link
              href="/login"
              className="md:hidden bg-nysc-gold text-nysc-green-deep font-bold px-4 py-2 rounded-lg text-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative pt-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-nysc-green-deep via-[#003d00] to-nysc-green" />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-nysc-green/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-nysc-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-green-100 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-nysc-gold rounded-full animate-pulse" />
              Official NYSC Digital Portal — 2025 Batch
            </div>

            <h1 className="text-5xl lg:text-[4.5rem] font-black text-white leading-[1.08] tracking-tight mb-6">
              Your Service Year,{' '}
              <span className="text-nysc-gold">Managed</span>{' '}
              Seamlessly.
            </h1>
            <p className="text-xl text-green-200 mb-10 leading-relaxed max-w-2xl">
              Register, pay, track clearance, and manage your entire NYSC journey — all in one
              secure platform built for Nigeria&apos;s future leaders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-nysc-gold text-nysc-green-deep font-black px-8 py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] text-base"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/25 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm text-base"
              >
                Sign In to Portal
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-6 mt-10">
              {['Remita-secured payments', 'OTP-verified accounts', 'Real-time updates'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2 text-green-300 text-sm">
                    <CheckCircle size={14} className="text-nysc-gold" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Stats ribbon */}
        <div className="relative bg-black/25 border-t border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: '350,000+', label: 'Corps Members Annually' },
                { value: '36', label: 'States Covered' },
                { value: '3', label: 'Annual Batches' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-nysc-gold">{stat.value}</p>
                  <p className="text-xs text-green-300 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-nysc-green font-bold text-xs uppercase tracking-[0.2em] mb-3">
              Portal Services
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Everything in one place.
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-lg">
              From registration to clearance — all your service year needs, digitised.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.Icon size={22} className={feature.color} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-nysc-green font-bold text-xs uppercase tracking-[0.2em] mb-3">
              Getting Started
            </p>
            <h2 className="text-4xl font-black text-gray-900">Up and running in 3 steps.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 bg-nysc-green text-white rounded-2xl flex items-center justify-center font-black text-lg mx-auto mb-4 shadow-sm">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-nysc-green">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Ready to begin your service year?
          </h2>
          <p className="text-green-200 mb-8 text-lg">
            Create your account in minutes and access all portal services for free.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-nysc-gold text-nysc-green-deep font-black px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-lg active:scale-[0.98] text-lg"
          >
            Create Your Account
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-nysc-green-deep text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-nysc-gold rounded-xl flex items-center justify-center font-black text-nysc-green-deep text-[10px]">
                NYSC
              </div>
              <div>
                <p className="font-bold text-sm text-white">National Youth Service Corps</p>
                <p className="text-xs text-green-400">Dedicated to Excellence in Service</p>
              </div>
            </div>
            <p className="text-green-500 text-sm">
              © {new Date().getFullYear()} NYSC · Plot 416, Tigris Crescent, Maitama, Abuja
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

const features = [
  {
    Icon: Shield,
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
    title: 'Registration',
    description:
      'Complete your NYSC registration online with secure document upload and real-time verification.',
  },
  {
    Icon: CreditCard,
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    title: 'Payments',
    description:
      'Pay your monthly allawee and other fees securely via Remita with instant RRR generation.',
  },
  {
    Icon: FileEdit,
    bg: 'bg-violet-50',
    color: 'text-violet-600',
    title: 'Course Correction',
    description:
      'Submit and track requests to correct personal information or academic record details.',
  },
  {
    Icon: CheckSquare,
    bg: 'bg-amber-50',
    color: 'text-amber-600',
    title: 'LGA Clearance',
    description:
      'Monitor your local government area clearance status and respond to queries in real time.',
  },
  {
    Icon: AlertTriangle,
    bg: 'bg-red-50',
    color: 'text-red-500',
    title: 'Disciplinary Cases',
    description:
      'View and respond to any disciplinary cases or flags raised during your service year.',
  },
  {
    Icon: Bell,
    bg: 'bg-yellow-50',
    color: 'text-yellow-600',
    title: 'Notifications',
    description:
      'Receive instant updates via email and SMS for every action and status change on your account.',
  },
]

const steps = [
  {
    title: 'Create your account',
    desc: 'Register with your email, NIN, and phone number. Verify via OTP.',
  },
  {
    title: 'Complete your profile',
    desc: 'Upload your required documents and confirm your posting details.',
  },
  {
    title: 'Access all services',
    desc: 'Pay fees, request corrections, track clearance — all from your dashboard.',
  },
]
