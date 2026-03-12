import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'

@Injectable()
export class AdminService {
  constructor(private readonly usersService: UsersService) {}

  async getDashboardStats() {
    return {
      message: 'Admin dashboard stats — connect to real data in Phase 3',
      stats: {
        totalMembers: 0,
        activeMembers: 0,
        pendingPayments: 0,
        pendingCorrections: 0,
        pendingClearances: 0,
        openCases: 0,
      },
    }
  }
}
