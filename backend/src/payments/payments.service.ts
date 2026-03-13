import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import * as crypto from 'crypto'
import { Payment } from './entities/payment.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async generateRrr(userId: string, amount: number, paymentType: string) {
    // Resolve user → corps member
    const member = await this.usersService.findCorpsMemberByUserId(userId)
    if (!member) throw new BadRequestException('Corps member profile not found. Please complete your registration.')

    const merchantId = this.configService.get('REMITA_MERCHANT_ID')
    const serviceTypeId = this.configService.get('REMITA_SERVICE_TYPE_ID')
    const apiKey = this.configService.get('REMITA_API_KEY')
    const orderId = `NYSC-${Date.now()}`
    const payerName = `${member.firstName} ${member.lastName}`

    const hash = crypto
      .createHash('sha512')
      .update(`${merchantId}${serviceTypeId}${orderId}${amount}${apiKey}`)
      .digest('hex')

    const response = await axios.post(
      `${this.configService.get('REMITA_BASE_URL')}/echannelservice.reg.registration.json`,
      {
        serviceTypeId,
        amount,
        orderId,
        payerName,
        payerEmail: '',
        payerPhone: '',
        description: `NYSC ${paymentType}`,
      },
      { headers: { Authorization: `remitaConsumerKey=${merchantId},remitaConsumerToken=${hash}` } }
    )

    const rrr = response.data?.RRR

    const payment = await this.paymentRepo.save({
      memberId: member.id,
      rrr,
      amount,
      paymentType,
      status: 'pending',
    })

    return { rrr, paymentId: payment.id, amount }
  }

  async verifyPayment(rrr: string) {
    const merchantId = this.configService.get('REMITA_MERCHANT_ID')
    const apiKey = this.configService.get('REMITA_API_KEY')

    const hash = crypto
      .createHash('sha512')
      .update(`${rrr}${merchantId}${apiKey}`)
      .digest('hex')

    const response = await axios.get(
      `${this.configService.get('REMITA_BASE_URL')}/echannelservice.reg.payment.status.json/${merchantId}/${rrr}/${hash}/status.reg.json`,
    )

    const status = response.data?.status === '00' ? 'successful' : 'failed'

    await this.paymentRepo.update({ rrr }, {
      status,
      remitaResponse: response.data,
      confirmedAt: status === 'successful' ? new Date() : undefined,
    })

    return { rrr, status, data: response.data }
  }

  async getMemberPayments(userId: string) {
    const member = await this.usersService.findCorpsMemberByUserId(userId)
    if (!member) return []
    return this.paymentRepo.find({
      where: { memberId: member.id },
      order: { createdAt: 'DESC' },
    })
  }
}
