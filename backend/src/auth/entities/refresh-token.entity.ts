import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'token_hash', unique: true })
  tokenHash: string

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date

  @Column({ default: false })
  revoked: boolean

  @Column({ name: 'ip_address', nullable: true })
  ipAddress: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
