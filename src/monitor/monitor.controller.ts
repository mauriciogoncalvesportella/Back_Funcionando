import { Controller, UseGuards, Get, Param, Request, Logger, UseFilters } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/shared/admin.guard';
import { RolesGuard } from 'src/shared/roles.guard';
import { Roles } from 'src/shared/roles.decorator';
import {DBExceptionFilter} from 'src/shared/db.filter';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('monitor')
export class MonitorController {
  constructor(
    private monitorService: MonitorService,
  ) {}

  @UseFilters(DBExceptionFilter)
  @Roles('monitor')
  @Get(':date')
  monitor (@Request() req, @Param('date') date) {
    return this.monitorService.monitor(date, req.user)
  }
}
