import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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
}
