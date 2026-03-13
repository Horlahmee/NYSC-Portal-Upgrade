'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '@/lib/api'

const schema = z.object({
  correctionType: z.string().min(1, 'Select a correction type'),
  oldValue: z.string().min(1, 'Enter current value'),
  newValue: z.string().min(1, 'Enter corrected value'),
  reason: z.string().min(10, 'Provide a reason (min 10 characters)'),
})

type FormData = z.infer<typeof schema>

export function CourseCorrectionForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      await api.post('/corrections', data)
      await queryClient.invalidateQueries({ queryKey: ['corrections', 'mine'] })
      toast.success('Correction request submitted — it is now under review.')
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message
      const text = Array.isArray(msg) ? msg[0] : msg
      const errorText = typeof text === 'string' ? text : 'Submission failed. Please try again.'
      setServerError(errorText)
      toast.error(errorText)
    }
  }

  return (
    <div className="card">
      <h2 className="font-semibold text-gray-900 mb-4">New Correction Request</h2>

      {submitted && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          Request submitted successfully. It is now under review.
        </div>
      )}

      {serverError && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Correction Type</label>
          <select {...register('correctionType')} className="input-field">
            <option value="">Select type...</option>
            <option value="name">Name</option>
            <option value="date_of_birth">Date of Birth</option>
            <option value="state_of_origin">State of Origin</option>
            <option value="institution">Institution</option>
            <option value="course">Course of Study</option>
            <option value="other">Other</option>
          </select>
          {errors.correctionType && <p className="text-red-500 text-xs mt-1">{errors.correctionType.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Value</label>
          <input {...register('oldValue')} className="input-field" placeholder="As it appears on the system" />
          {errors.oldValue && <p className="text-red-500 text-xs mt-1">{errors.oldValue.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Correct Value</label>
          <input {...register('newValue')} className="input-field" placeholder="What it should be" />
          {errors.newValue && <p className="text-red-500 text-xs mt-1">{errors.newValue.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason for Correction</label>
          <textarea
            {...register('reason')}
            rows={3}
            className="input-field resize-none"
            placeholder="Explain why this correction is needed..."
          />
          {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </span>
          ) : 'Submit Request'}
        </button>
      </form>
    </div>
  )
}
