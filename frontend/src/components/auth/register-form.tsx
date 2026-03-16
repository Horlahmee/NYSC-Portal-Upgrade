'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Enter a valid email address'),
    phone: z.string().regex(/^(\+234|0)[789]\d{9}$/, 'Enter a valid Nigerian phone number'),
    nin: z.string().length(11, 'NIN must be 11 digits').regex(/^\d+$/, 'NIN must be numeric'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })

  async function onSubmit(data: RegisterFormData) {
    setServerError(null)
    try {
      const { confirmPassword: _, ...payload } = data
      await api.post('/auth/register', payload)
      setSuccess(true)
      // Redirect to login after a short delay so the user can read the message
      setTimeout(() => router.push('/login'), 3000)
    } catch (err: unknown) {
      console.error('[register error]', err)
      const e = err as { response?: { status?: number; data?: { message?: string | string[] } }; message?: string }
      const msg = e?.response?.data?.message
      const text = Array.isArray(msg) ? msg[0] : msg
      if (typeof text === 'string') {
        setServerError(text)
      } else if (e?.response?.status) {
        setServerError(`Request failed with status ${e.response.status}. Check the browser console for details.`)
      } else if (e?.message) {
        setServerError(e.message)
      } else {
        setServerError('Registration failed. Please try again.')
      }
    }
  }

  if (success) {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 px-5 py-6 text-center space-y-2">
        <p className="font-semibold text-green-800">Account created successfully!</p>
        <p className="text-sm text-green-700">
          Please check your email to verify your account. Redirecting to login…
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
          <input {...register('firstName')} className="input-field" placeholder="John" />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
          <input {...register('lastName')} className="input-field" placeholder="Doe" />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
        <input {...register('email')} type="email" className="input-field" placeholder="you@example.com" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
        <input {...register('phone')} type="tel" className="input-field" placeholder="08012345678" />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">NIN (National Identification Number)</label>
        <input {...register('nin')} className="input-field" placeholder="12345678901" maxLength={11} />
        {errors.nin && <p className="text-red-500 text-xs mt-1">{errors.nin.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className="input-field pr-10"
            placeholder="Min. 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
        <input
          {...register('confirmPassword')}
          type="password"
          className="input-field"
          placeholder="Re-enter password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2">
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Creating account...
          </span>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  )
}
