import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClearanceController } from './clearance.controller'
import { ClearanceService } from './clearance.service'
import { LgaClearance } from './entities/lga-clearance.entity'

@Module({
  imports: [TypeOrmModule.forFeature([LgaClearance])],
  controllers: [ClearanceController],
  providers: [ClearanceService],
})
export class ClearanceModule {}
