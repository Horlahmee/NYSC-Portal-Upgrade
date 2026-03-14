import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { CorpsMember } from './entities/corps-member.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(CorpsMember)
    private readonly corpsMemberRepo: Repository<CorpsMember>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email: email.toLowerCase() } })
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create({
      ...data,
      email: data.email?.toLowerCase(),
    })
    return this.userRepo.save(user)
  }

  async markEmailVerified(id: string): Promise<void> {
    await this.userRepo.update(id, { isEmailVerified: true })
  }

  async incrementFailedAttempts(id: string): Promise<void> {
    const user = await this.findById(id)
    if (!user) return
    const attempts = user.failedLoginAttempts + 1
    const lockedUntil = attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null
    await this.userRepo.update(id, { failedLoginAttempts: attempts, lockedUntil })
  }

  async resetFailedAttempts(id: string): Promise<void> {
    await this.userRepo.update(id, { failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: new Date() })
  }

  async findAll(search?: string, page = 1, limit = 20) {
    const where = search
      ? [{ email: ILike(`%${search}%`) }, { phone: ILike(`%${search}%`) }]
      : undefined
    const [users, total] = await this.userRepo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      select: ['id', 'email', 'phone', 'role', 'isEmailVerified', 'lastLoginAt', 'createdAt'],
    })
    return { users, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async createCorpsMember(userId: string, firstName: string, lastName: string): Promise<CorpsMember> {
    const member = this.corpsMemberRepo.create({ userId, firstName, lastName, status: 'pending' })
    return this.corpsMemberRepo.save(member)
  }

  async findCorpsMemberByUserId(userId: string): Promise<CorpsMember | null> {
    return this.corpsMemberRepo.findOne({ where: { userId } })
  }
}
