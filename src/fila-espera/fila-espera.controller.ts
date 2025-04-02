import { Controller, Post, UseFilters, UseGuards, Get, Body, Delete, Param, Req } from '@nestjs/common';
import { FilaEsperaService } from './fila-espera.service';
import { DBExceptionFilter } from 'src/shared/db.filter';
import { FilaEsperaCreateDTO, FilaEsperaAllDTO } from './fila-espera.dto';
import { FilaEsperaEntity } from './fila-espera.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {Roles} from 'src/shared/roles.decorator';

@UseFilters(DBExceptionFilter)
@UseGuards(JwtAuthGuard)
@Controller('fila-espera')
export class FilaEsperaController {
  constructor(
    private filaEsperaService: FilaEsperaService,
  ) {}

  @Roles('atendimento.handle-queue')
  @Post('add')
  async add (@Req() req, @Body() data: FilaEsperaCreateDTO): Promise<FilaEsperaEntity> {
    return await this.filaEsperaService.add(data, req.user)
  }

  @Get('get/online')
  async getOnline (): Promise<FilaEsperaEntity[]> {
    return await this.filaEsperaService.allOnline()
  }

  @Roles('atendimento.handle-queue')
  @Delete('delete/:cd')
  async delete (@Req() req, @Param('cd') cd: number): Promise<void> {
    return await this.filaEsperaService.delete(cd, req.user)
  }

  @Roles('atendimento.handle-queue')
  @Post('all')
  async all (@Body() allDTO: FilaEsperaAllDTO) {
    return await this.filaEsperaService.all(allDTO)
  }
}
