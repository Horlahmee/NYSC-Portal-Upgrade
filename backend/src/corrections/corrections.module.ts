import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CorrectionsController } from './corrections.controller'
import { CorrectionsService } from './corrections.service'
import { CourseCorrection } from './entities/course-correction.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CourseCorrection])],
  controllers: [CorrectionsController],
  providers: [CorrectionsService],
})
export class CorrectionsModule {}
