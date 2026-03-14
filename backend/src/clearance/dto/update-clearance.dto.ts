import { IsString, IsIn, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateClearanceDto {
  @ApiProperty({ example: 'cleared', enum: ['cleared', 'query', 'withheld'] })
  @IsString()
  @IsIn(['cleared', 'query', 'withheld'], { message: 'status must be cleared, query, or withheld' })
  status: string

  @ApiPropertyOptional({ example: 'Member completed all required community development activities.' })
  @IsOptional()
  @IsString()
  notes?: string

  @ApiPropertyOptional({ example: 'Attendance record incomplete.' })
  @IsOptional()
  @IsString()
  queryReason?: string
}
