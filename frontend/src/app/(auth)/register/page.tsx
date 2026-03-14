import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/register-form'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Register' }

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">

      {/* ── Left brand panel (desktop only) ──────────────── */}
      <div className="hidden lg:flex lg:w-5/12 relative flex-col justify-between p-12 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-nysc-green-deep via-[#003d00] to-nysc-green" />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-nysc-gold/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-nysc-gold rounded-xl flex items-center justify-center font-black text-nysc-green-deep text-xs">
              NYSC
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-none">NYSC Portal</p>
              <p className="text-xs text-green-300 mt-0.5">National Youth Service Corps</p>
            </div>
          </Link>
        </div>

        {/* Middle content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-black text-white leading-[1.15] mb-4">
              Begin your<br />service year<br />
              <span className="text-nysc-gold">the right way.</span>
            </h2>
            <p className="text-green-200 text-sm leading-relaxed max-w-xs">
              Join 350,000+ corps members on the official NYSC digital platform.
            </p>
          </div>

          <ul className="space-y-3">
            {[
              'NIN-verified registration',
              'Instant email confirmation',
              'Access to all portal features',
              'Secure and encrypted account',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle size={15} className="text-nysc-gold shrink-0" />
                <span className="text-sm text-green-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-xs text-green-500">© 2025 National Youth Service Corps</p>
        </div>
      </div>

      {/* ── Right form panel ────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 sm:px-12 bg-slate-50">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-nysc-green rounded-xl flex items-center justify-center font-black text-white text-xs">
              NYSC
            </div>
            <p className="font-bold text-nysc-green text-sm">NYSC Portal</p>
          </Link>
        </div>

        <div className="w-full max-w-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-500 text-sm">
              Already registered?{' '}
              <Link href="/login" className="text-nysc-green font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
            <RegisterForm />
          </div>
        </div>
      </div>

    </div>
  )
}
