import { IsString, IsNotEmpty, MinLength, IsIn } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

const CORRECTION_TYPES = ['name', 'date_of_birth', 'state_of_origin', 'institution', 'course', 'other'] as const

export class CreateCorrectionDto {
  @ApiProperty({ example: 'name', enum: CORRECTION_TYPES })
  @IsString()
  @IsIn(CORRECTION_TYPES, { message: 'correctionType must be a valid correction type' })
  correctionType: string

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'oldValue must not be empty' })
  oldValue: string

  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @IsNotEmpty({ message: 'newValue must not be empty' })
  newValue: string

  @ApiProperty({ example: 'My name was misspelled during registration.' })
  @IsString()
  @MinLength(10, { message: 'reason must be at least 10 characters' })
  reason: string
}
