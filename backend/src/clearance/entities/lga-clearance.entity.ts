import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('lga_clearances')
export class LgaClearance {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'member_id' })
  memberId: string

  @Column({ name: 'lga_id' })
  lgaId: number

  @Column({ default: 'pending' })
  status: string

  @Column({ name: 'cleared_by', nullable: true })
  clearedBy: string

  @Column({ name: 'query_reason', nullable: true })
  queryReason: string

  @Column({ nullable: true })
  notes: string

  @Column({ name: 'cleared_at', type: 'timestamptz', nullable: true })
  clearedAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
