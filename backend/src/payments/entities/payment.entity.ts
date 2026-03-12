import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm'

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'member_id' })
  memberId: string

  @Column({ nullable: true, unique: true })
  rrr: string

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number

  @Column({ name: 'payment_type' })
  paymentType: string

  @Column({ default: 'pending' })
  status: string

  @Column({ name: 'remita_response', type: 'jsonb', nullable: true })
  remitaResponse: object

  @Column({ nullable: true })
  month: number

  @Column({ nullable: true })
  year: number

  @Column({ name: 'initiated_at', type: 'timestamptz', default: () => 'NOW()' })
  initiatedAt: Date

  @Column({ name: 'confirmed_at', type: 'timestamptz', nullable: true })
  confirmedAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
