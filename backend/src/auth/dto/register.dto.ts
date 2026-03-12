import { IsEmail, IsString, MinLength, Matches, Length, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string

  @ApiProperty({ example: 'john.doe@email.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: '08012345678' })
  @Matches(/^(\+234|0)[789]\d{9}$/, { message: 'Enter a valid Nigerian phone number' })
  phone: string

  @ApiProperty({ example: '12345678901' })
  @Length(11, 11, { message: 'NIN must be exactly 11 digits' })
  @Matches(/^\d+$/, { message: 'NIN must be numeric' })
  nin: string

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string
}
