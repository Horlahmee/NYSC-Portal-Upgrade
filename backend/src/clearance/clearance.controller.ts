import { Controller, Get, Patch, Param, Body, UseGuards, Req } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard, Roles } from '../auth/guards/roles.guard'
import { ClearanceService } from './clearance.service'
import { UpdateClearanceDto } from './dto/update-clearance.dto'

@ApiTags('LGA Clearance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clearance')
export class ClearanceController {
  constructor(private readonly clearanceService: ClearanceService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get my LGA clearance status' })
  getStatus(@Req() req: any) {
    return this.clearanceService.getStatus(req.user.id)
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'superadmin', 'lga_officer', 'state_coordinator')
  @ApiOperation({ summary: 'Update clearance status (LGA officer / admin only)' })
  update(@Param('id') id: string, @Body() body: UpdateClearanceDto, @Req() req: any) {
    return this.clearanceService.updateStatus(id, req.user.id, body.status, body.notes, body.queryReason)
  }
}
