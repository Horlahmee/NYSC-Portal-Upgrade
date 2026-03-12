import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('course_corrections')
export class CourseCorrection {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'member_id' })
  memberId: string

  @Column({ name: 'correction_type' })
  correctionType: string

  @Column({ name: 'old_value' })
  oldValue: string

  @Column({ name: 'new_value' })
  newValue: string

  @Column({ nullable: true })
  reason: string

  @Column({ name: 'supporting_docs', type: 'jsonb', default: [] })
  supportingDocs: string[]

  @Column({ default: 'pending' })
  status: string

  @Column({ name: 'reviewed_by', nullable: true })
  reviewedBy: string

  @Column({ name: 'review_note', nullable: true })
  reviewNote: string

  @Column({ name: 'reviewed_at', type: 'timestamptz', nullable: true })
  reviewedAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
