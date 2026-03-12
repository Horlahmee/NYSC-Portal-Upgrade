export type UserRole = 'corps_member' | 'lga_officer' | 'state_coordinator' | 'admin' | 'superadmin'
export type UserStatus = 'pending' | 'active' | 'suspended' | 'discharged' | 'absconded'
export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'reversed'
export type CorrectionStatus = 'pending' | 'under_review' | 'approved' | 'rejected'
export type ClearanceStatus = 'pending' | 'cleared' | 'query' | 'withheld'

export interface User {
  id: string
  email: string
  phone: string
  role: UserRole
  isEmailVerified: boolean
  isPhoneVerified: boolean
}

export interface CorpsMember {
  id: string
  userId: string
  stateCode: string
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  gender: 'male' | 'female'
  stateOfOrigin?: State
  postedState?: State
  institution?: Institution
  courseOfStudy?: string
  ppaName?: string
  ppaAddress?: string
  status: UserStatus
  passportUrl?: string
  serviceYear?: ServiceYear
}

export interface State {
  id: number
  name: string
  code: string
}

export interface Lga {
  id: number
  stateId: number
  name: string
}

export interface Institution {
  id: number
  name: string
  type: string
}

export interface ServiceYear {
  id: number
  year: number
  batch: 'A' | 'B' | 'C'
  stream: '1' | '2' | '3'
}

export interface Payment {
  id: string
  memberId: string
  rrr?: string
  amount: number
  paymentType: string
  status: PaymentStatus
  month?: number
  year?: number
  initiatedAt: string
  confirmedAt?: string
}

export interface CourseCorrection {
  id: string
  memberId: string
  correctionType: string
  oldValue: string
  newValue: string
  reason?: string
  status: CorrectionStatus
  reviewNote?: string
  reviewedAt?: string
  createdAt: string
}

export interface LgaClearance {
  id: string
  memberId: string
  lgaId: number
  status: ClearanceStatus
  queryReason?: string
  clearedAt?: string
}

export interface AuthTokens {
  accessToken: string
  expiresIn: number
}
