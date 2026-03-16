import {
  Injectable, UnauthorizedException, ConflictException, BadRequestException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'
import * as bcrypt from 'bcryptjs'
import { createHash } from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { UsersService } from '../users/users.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { VerifyOtpDto } from './dto/verify-otp.dto'
import { RefreshToken } from './entities/refresh-token.entity'
import { Otp } from './entities/otp.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
    @InjectRepository(Otp)
    private readonly otpRepo: Repository<Otp>,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email)
    if (existingUser) throw new ConflictException('Email already registered')

    const passwordHash = await bcrypt.hash(dto.password, 12)
    const user = await this.usersService.create({ ...dto, passwordHash })

    // Create a stub CorpsMember profile linked to the new user
    // Non-critical: profile can be completed on first login
    try {
      await this.usersService.createCorpsMember(user.id, dto.firstName, dto.lastName, dto.nin)
    } catch (_) {}

    return { message: 'Registration successful. Please verify your email.' }
  }

  async login(dto: LoginDto, res: Response) {
    const user = await this.usersService.findByEmail(dto.email)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('Account temporarily locked. Try again later.')
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash)
    if (!passwordMatch) {
      await this.usersService.incrementFailedAttempts(user.id)
      throw new UnauthorizedException('Invalid credentials')
    }

    await this.usersService.resetFailedAttempts(user.id)

    const accessToken = this.generateAccessToken(user.id, user.role)
    await this.setRefreshTokenCookie(user.id, res)

    return { accessToken, expiresIn: 900 }
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const otp = await this.otpRepo.findOne({
      where: { userId: dto.userId, purpose: dto.purpose, used: false },
      order: { createdAt: 'DESC' },
    })

    if (!otp || otp.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired OTP')
    }

    if (otp.code !== dto.code) {
      throw new BadRequestException('Incorrect OTP')
    }

    await this.otpRepo.update(otp.id, { used: true })

    if (dto.purpose === 'email_verify') {
      await this.usersService.markEmailVerified(dto.userId)
    }

    return { message: 'OTP verified successfully' }
  }

  async refreshToken(req: Request, res: Response) {
    const token = req.cookies?.refresh_token
    if (!token) throw new UnauthorizedException()

    const tokenHash = createHash('sha256').update(token).digest('hex')
    const stored = await this.refreshTokenRepo.findOne({
      where: { tokenHash },
      relations: ['user'],
    })

    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token invalid or expired')
    }

    await this.refreshTokenRepo.update(stored.id, { revoked: true })

    const accessToken = this.generateAccessToken(stored.user.id, stored.user.role)
    await this.setRefreshTokenCookie(stored.user.id, res)

    return { accessToken, expiresIn: 900 }
  }

  async logout(req: Request, res: Response) {
    const token = req.cookies?.refresh_token
    if (token) {
      const tokenHash = await bcrypt.hash(token, 1)
      await this.refreshTokenRepo.update({ tokenHash }, { revoked: true })
    }
    const isProduction = this.configService.get('NODE_ENV') === 'production'
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    })
    return { message: 'Logged out successfully' }
  }

  private generateAccessToken(userId: string, role: string) {
    return this.jwtService.sign({ sub: userId, role })
  }

  private async setRefreshTokenCookie(userId: string, res: Response) {
    const token = uuidv4()
    const tokenHash = createHash('sha256').update(token).digest('hex')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    await this.refreshTokenRepo.save({ userId, tokenHash, expiresAt })

    const isProduction = this.configService.get('NODE_ENV') === 'production'
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      expires: expiresAt,
    })
  }
}
