import { Controller, UseFilters, UseGuards, Req, Res, Param, Get, Query, Header } from '@nestjs/common';
import {DBExceptionFilter} from 'src/shared/db.filter';
import {JwtFromUrlGuard} from 'src/auth/jwt-from-url.guard';
import {TicketFilterDTO} from 'src/ticket/ticket.dto';
import {FilesService} from './files.service';

@Controller('files')
export class FilesController {
  constructor(
    private fileService: FilesService,
  ) {  }

  @Header("Content-Type", "text/csv; charset=windows-1252")
  @Header("Content-Disposition", 'attachment; filename="tickets.csv"')
  @UseFilters(DBExceptionFilter)
  @UseGuards(JwtFromUrlGuard)
  @Get('tickets-csv')
  async downloadTicketTableCSV (@Req() req, @Res() res, @Query() query) {
    const ticketFilter: TicketFilterDTO = JSON.parse(query.filter)
    await this.fileService.downloadTicketTableCSV(res, req.user, ticketFilter)
  }
}
