import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Login' }

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-nysc-green rounded-full flex items-center justify-center font-bold text-white text-xl">
            NYSC
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-nysc-green font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-xl border border-gray-100">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
