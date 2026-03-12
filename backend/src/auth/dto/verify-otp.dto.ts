import { IsString, IsUUID, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class VerifyOtpDto {
  @ApiProperty()
  @IsUUID()
  userId: string

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  code: string

  @ApiProperty({ example: 'email_verify' })
  @IsString()
  purpose: string
}
