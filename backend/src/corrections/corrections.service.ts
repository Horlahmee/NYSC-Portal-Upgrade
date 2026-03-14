import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CourseCorrection } from './entities/course-correction.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class CorrectionsService {
  constructor(
    @InjectRepository(CourseCorrection)
    private readonly repo: Repository<CourseCorrection>,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, data: Partial<CourseCorrection>) {
    const member = await this.usersService.findCorpsMemberByUserId(userId)
    if (!member) throw new BadRequestException('Corps member profile not found.')
    return this.repo.save({ ...data, memberId: member.id, status: 'pending' })
  }

  async findByMember(userId: string) {
    const member = await this.usersService.findCorpsMemberByUserId(userId)
    if (!member) return []
    return this.repo.find({ where: { memberId: member.id }, order: { createdAt: 'DESC' } })
  }

  async findAll(page = 1, limit = 50) {
    const [items, total] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    })
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async review(id: string, reviewedBy: string, status: string, reviewNote?: string) {
    await this.repo.update(id, { status, reviewedBy, reviewNote, reviewedAt: new Date() })
    return this.repo.findOne({ where: { id } })
  }
}
