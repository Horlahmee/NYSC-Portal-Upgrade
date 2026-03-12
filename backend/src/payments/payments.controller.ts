import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { PaymentsService } from './payments.service'

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('generate-rrr')
  @ApiOperation({ summary: 'Generate Remita RRR for payment' })
  generateRrr(@Body() body: { amount: number; paymentType: string }, @Req() req: any) {
    return this.paymentsService.generateRrr(req.user.id, body.amount, body.paymentType)
  }

  @Get('verify/:rrr')
  @ApiOperation({ summary: 'Verify payment status by RRR' })
  verify(@Param('rrr') rrr: string) {
    return this.paymentsService.verifyPayment(rrr)
  }

  @Get('history')
  @ApiOperation({ summary: 'Get payment history for current member' })
  history(@Req() req: any) {
    return this.paymentsService.getMemberPayments(req.user.id)
  }
}
