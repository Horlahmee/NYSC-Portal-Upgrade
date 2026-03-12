import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('otps')
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @Column({ length: 6 })
  code: string

  @Column()
  purpose: string

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date

  @Column({ default: false })
  used: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
