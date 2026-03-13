import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { UsersModule } from '../users/users.module'
import { CorrectionsModule } from '../corrections/corrections.module'
import { User } from '../users/entities/user.entity'
import { Payment } from '../payments/entities/payment.entity'
import { CourseCorrection } from '../corrections/entities/course-correction.entity'
import { LgaClearance } from '../clearance/entities/lga-clearance.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Payment, CourseCorrection, LgaClearance]),
    UsersModule,
    CorrectionsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
