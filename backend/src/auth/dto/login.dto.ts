import { IsEmail, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'john.doe@email.com' })
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string
}
