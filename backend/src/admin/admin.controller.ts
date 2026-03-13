import { Controller, Get, Patch, Query, Param, Body, UseGuards, Req } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard, Roles } from '../auth/guards/roles.guard'
import { AdminService } from './admin.service'

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'superadmin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get admin dashboard statistics' })
  getStats() {
    return this.adminService.getDashboardStats()
  }

  @Get('members')
  @ApiOperation({ summary: 'List all members with optional search and pagination' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  getMembers(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getMembers(search, Number(page) || 1, Number(limit) || 20)
  }

  @Get('corrections')
  @ApiOperation({ summary: 'List all correction requests' })
  getAllCorrections() {
    return this.adminService.getAllCorrections()
  }

  @Patch('corrections/:id/review')
  @ApiOperation({ summary: 'Review a correction request' })
  reviewCorrection(
    @Param('id') id: string,
    @Body() body: { status: string; reviewNote?: string },
    @Req() req: any,
  ) {
    return this.adminService.reviewCorrection(id, req.user.id, body.status, body.reviewNote)
  }

  @Get('clearances')
  @ApiOperation({ summary: 'List all LGA clearance records' })
  getAllClearances() {
    return this.adminService.getAllClearances()
  }

  @Patch('clearances/:id')
  @ApiOperation({ summary: 'Update a clearance record status' })
  updateClearance(
    @Param('id') id: string,
    @Body() body: { status: string; notes?: string; queryReason?: string },
    @Req() req: any,
  ) {
    return this.adminService.updateClearance(id, req.user.id, body.status, body.notes, body.queryReason)
  }
}
