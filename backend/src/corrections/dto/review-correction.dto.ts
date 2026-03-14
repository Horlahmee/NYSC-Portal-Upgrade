import { IsString, IsIn, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ReviewCorrectionDto {
  @ApiProperty({ example: 'approved', enum: ['approved', 'rejected', 'under_review'] })
  @IsString()
  @IsIn(['approved', 'rejected', 'under_review'], { message: 'status must be approved, rejected, or under_review' })
  status: string

  @ApiPropertyOptional({ example: 'Name confirmed against JAMB records.' })
  @IsOptional()
  @IsString()
  reviewNote?: string
}
