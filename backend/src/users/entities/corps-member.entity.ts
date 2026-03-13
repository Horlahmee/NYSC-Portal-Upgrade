import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm'

export type MemberStatus = 'pending' | 'active' | 'suspended' | 'discharged' | 'absconded'

@Entity('corps_members')
export class CorpsMember {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id', unique: true })
  userId: string

  @Column({ name: 'state_code', nullable: true })
  stateCode: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'middle_name', nullable: true })
  middleName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  gender: string

  @Column({ name: 'state_of_origin_id', nullable: true })
  stateOfOriginId: number

  @Column({ name: 'posted_state_id', nullable: true })
  postedStateId: number

  @Column({ name: 'institution_id', nullable: true })
  institutionId: number

  @Column({ name: 'course_of_study', nullable: true })
  courseOfStudy: string

  @Column({ name: 'ppa_name', nullable: true })
  ppaName: string

  @Column({ name: 'ppa_address', nullable: true })
  ppaAddress: string

  @Column({
    type: 'enum',
    enum: ['pending', 'active', 'suspended', 'discharged', 'absconded'],
    default: 'pending',
  })
  status: MemberStatus

  @Column({ name: 'passport_url', nullable: true })
  passportUrl: string

  @Column({ name: 'service_year_id', nullable: true })
  serviceYearId: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
