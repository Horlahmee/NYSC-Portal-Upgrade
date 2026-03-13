import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CorrectionsController } from './corrections.controller'
import { CorrectionsService } from './corrections.service'
import { CourseCorrection } from './entities/course-correction.entity'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([CourseCorrection]), UsersModule],
  controllers: [CorrectionsController],
  providers: [CorrectionsService],
  exports: [CorrectionsService],
})
export class CorrectionsModule {}
