import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { CorrectionsService } from '../corrections/corrections.service'
import { User } from '../users/entities/user.entity'
import { Payment } from '../payments/entities/payment.entity'
import { CourseCorrection } from '../corrections/entities/course-correction.entity'
import { LgaClearance } from '../clearance/entities/lga-clearance.entity'

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly correctionsService: CorrectionsService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(CourseCorrection) private readonly correctionRepo: Repository<CourseCorrection>,
    @InjectRepository(LgaClearance) private readonly clearanceRepo: Repository<LgaClearance>,
  ) {}

  async getDashboardStats() {
    const [
      totalMembers,
      pendingPayments,
      pendingCorrections,
      underReviewCorrections,
      pendingClearances,
      queriedClearances,
    ] = await Promise.all([
      this.userRepo.count({ where: { role: 'corps_member' } }),
      this.paymentRepo.count({ where: { status: 'pending' } }),
      this.correctionRepo.count({ where: { status: 'pending' } }),
      this.correctionRepo.count({ where: { status: 'under_review' } }),
      this.clearanceRepo.count({ where: { status: 'pending' } }),
      this.clearanceRepo.count({ where: { status: 'query' } }),
    ])

    return {
      totalMembers,
      pendingPayments,
      pendingCorrections: pendingCorrections + underReviewCorrections,
      pendingClearances: pendingClearances + queriedClearances,
    }
  }

  async getMembers(search?: string, page = 1, limit = 20) {
    return this.usersService.findAll(search, page, limit)
  }

  async getAllCorrections() {
    return this.correctionsService.findAll()
  }

  async reviewCorrection(id: string, reviewedBy: string, status: string, reviewNote?: string) {
    return this.correctionsService.review(id, reviewedBy, status, reviewNote)
  }

  async getAllClearances() {
    return this.clearanceRepo.find({ order: { createdAt: 'DESC' } })
  }

  async updateClearance(id: string, clearedBy: string, status: string, notes?: string, queryReason?: string) {
    await this.clearanceRepo.update(id, {
      status,
      clearedBy,
      notes,
      queryReason,
      clearedAt: status === 'cleared' ? new Date() : undefined,
    })
    return this.clearanceRepo.findOne({ where: { id } })
  }
}
