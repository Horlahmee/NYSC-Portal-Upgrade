import { Controller, Post, Get, Body, Param, Patch, UseGuards, Req } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CorrectionsService } from './corrections.service'

@ApiTags('Course Corrections')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('corrections')
export class CorrectionsController {
  constructor(private readonly correctionsService: CorrectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a course correction request' })
  create(@Body() body: any, @Req() req: any) {
    return this.correctionsService.create(req.user.id, body)
  }

  @Get('mine')
  @ApiOperation({ summary: 'Get my correction requests' })
  mine(@Req() req: any) {
    return this.correctionsService.findByMember(req.user.id)
  }

  @Patch(':id/review')
  @ApiOperation({ summary: 'Review a correction request (admin)' })
  review(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    return this.correctionsService.review(id, req.user.id, body.status, body.reviewNote)
  }
}
