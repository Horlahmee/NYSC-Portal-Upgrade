import { IsString, IsNotEmpty, IsPositive, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GenerateRrrDto {
  @ApiProperty({ example: 33000 })
  @IsNumber()
  @IsPositive({ message: 'amount must be a positive number' })
  amount: number

  @ApiProperty({ example: 'Monthly Allawee' })
  @IsString()
  @IsNotEmpty({ message: 'paymentType must not be empty' })
  paymentType: string
}
