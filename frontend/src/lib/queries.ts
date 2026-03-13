import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Payment, CourseCorrection, LgaClearance } from '@/types'

export function usePaymentHistory() {
  return useQuery({
    queryKey: ['payments', 'history'],
    queryFn: () => api.get<Payment[]>('/payments/history').then((r) => r.data),
  })
}

export function useMyCorrections() {
  return useQuery({
    queryKey: ['corrections', 'mine'],
    queryFn: () => api.get<CourseCorrection[]>('/corrections/mine').then((r) => r.data),
  })
}

export function useClearanceStatus() {
  return useQuery({
    queryKey: ['clearance', 'status'],
    queryFn: () => api.get<LgaClearance[]>('/clearance/status').then((r) => r.data),
  })
}
