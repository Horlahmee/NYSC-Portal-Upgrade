import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CourseCorrection } from './entities/course-correction.entity'

@Injectable()
export class CorrectionsService {
  constructor(
    @InjectRepository(CourseCorrection)
    private readonly repo: Repository<CourseCorrection>,
  ) {}

  async create(memberId: string, data: Partial<CourseCorrection>) {
    return this.repo.save({ ...data, memberId, status: 'pending' })
  }

  async findByMember(memberId: string) {
    return this.repo.find({ where: { memberId }, order: { createdAt: 'DESC' } })
  }

  async findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } })
  }

  async review(id: string, reviewedBy: string, status: string, reviewNote?: string) {
    await this.repo.update(id, { status, reviewedBy, reviewNote, reviewedAt: new Date() })
    return this.repo.findOne({ where: { id } })
  }
}
