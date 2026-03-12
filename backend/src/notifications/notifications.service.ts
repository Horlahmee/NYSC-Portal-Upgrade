import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name)

  constructor(private readonly configService: ConfigService) {}

  async sendEmail(to: string, subject: string, html: string) {
    const apiKey = this.configService.get('RESEND_API_KEY')
    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY not set — skipping email')
      return
    }

    try {
      await axios.post(
        'https://api.resend.com/emails',
        {
          from: this.configService.get('EMAIL_FROM') || 'noreply@nysc.gov.ng',
          to,
          subject,
          html,
        },
        { headers: { Authorization: `Bearer ${apiKey}` } }
      )
    } catch (err) {
      this.logger.error(`Failed to send email to ${to}`, err)
    }
  }

  async sendSms(to: string, message: string) {
    const apiKey = this.configService.get('TERMII_API_KEY')
    if (!apiKey) {
      this.logger.warn('TERMII_API_KEY not set — skipping SMS')
      return
    }

    try {
      await axios.post('https://api.ng.termii.com/api/sms/send', {
        to,
        from: this.configService.get('TERMII_SENDER_ID') || 'NYSC',
        sms: message,
        type: 'plain',
        api_key: apiKey,
        channel: 'generic',
      })
    } catch (err) {
      this.logger.error(`Failed to send SMS to ${to}`, err)
    }
  }
}
