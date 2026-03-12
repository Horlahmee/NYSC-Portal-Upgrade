import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LgaClearance } from './entities/lga-clearance.entity'

@Injectable()
export class ClearanceService {
  constructor(
    @InjectRepository(LgaClearance)
    private readonly repo: Repository<LgaClearance>,
  ) {}

  async getStatus(memberId: string) {
    return this.repo.find({ where: { memberId }, order: { createdAt: 'DESC' } })
  }

  async updateStatus(id: string, clearedBy: string, status: string, notes?: string, queryReason?: string) {
    await this.repo.update(id, {
      status,
      clearedBy,
      notes,
      queryReason,
      clearedAt: status === 'cleared' ? new Date() : null,
    })
    return this.repo.findOne({ where: { id } })
  }
}
