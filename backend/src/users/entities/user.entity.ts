import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm'

export type UserRole = 'corps_member' | 'lga_officer' | 'state_coordinator' | 'admin' | 'superadmin'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  phone: string

  @Column({ name: 'password_hash' })
  passwordHash: string

  @Column({ type: 'enum', enum: ['corps_member', 'lga_officer', 'state_coordinator', 'admin', 'superadmin'], default: 'corps_member' })
  role: UserRole

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean

  @Column({ name: 'is_phone_verified', default: false })
  isPhoneVerified: boolean

  @Column({ name: 'two_fa_enabled', default: false })
  twoFaEnabled: boolean

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt: Date

  @Column({ name: 'failed_login_attempts', default: 0 })
  failedLoginAttempts: number

  @Column({ name: 'locked_until', type: 'timestamptz', nullable: true })
  lockedUntil: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
