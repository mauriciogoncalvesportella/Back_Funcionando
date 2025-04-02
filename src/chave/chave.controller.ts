import { Controller, Post, Request, Body, ParseArrayPipe, Get, UseGuards, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { ChaveService } from './chave.service';
import { ChaveCreateDTO, getVersaoDTO, updateVersaoDTO, updateChaveDTO, addSolicitanteDTO, updateDtvalidadeDTO, AllChavesFonesDTO, UpdateChaveFoneDTO, CreateChaveFoneDTO } from './chave.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommerceGuard } from './commerce.guard';
import {DBExceptionFilter} from 'src/shared/db.filter';
import {InfoInterceptor} from 'src/shared/info.interceptor';
import {addDays} from 'date-fns';

@Controller()
export class ChaveController {
  constructor(
    private chaveService: ChaveService,
  ) {}
  
  @UseFilters(DBExceptionFilter)
  @UseGuards(JwtAuthGuard)
  @Get('chave/solicitante/all-from-chave/:cd')
  allClientesFromChave(@Request() req, @Param('cd') cd: Number) {
    return this.chaveService.allSolicitantesFromChave(cd)
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(DBExceptionFilter)
  @Post('chave/solicitante/add')
  addSolicitante(@Body() solicitante: addSolicitanteDTO) {
    return this.chaveService.addSolicitante(solicitante)
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(DBExceptionFilter)
  @Post('chave/update-dt-validade')
  async updateDtvalidade (@Body() dto: updateDtvalidadeDTO) {
    return this.chaveService.updateDtvalidade(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('chave/all')
  allChaves(@Request() req) {
    return this.chaveService.getAllChaves();
  }

  @UseGuards(JwtAuthGuard)
  @Post('chave/all-chaves-fones')
  async allChavesFones (@Body() dto: AllChavesFonesDTO) {
    return this.chaveService.getAllChavesFones(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('chave/update-chave-fone')
  async updateChaveFone (@Body() dto: UpdateChaveFoneDTO) {
    await this.chaveService.updateChaveFone(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('chave/create-chave-fone')
  async createChaveFone (@Body() dto: CreateChaveFoneDTO) {
    return await this.chaveService.createChaveFone(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('chave/delete-chave-fone/:cd')
  async deleteChaveFone (@Param('cd') cd: number) {
    return await this.chaveService.deleteChaveFone(cd)
  }
  
  @UseFilters(DBExceptionFilter)
  @UseGuards(CommerceGuard)
  @Post('commerce/add')
  add(
    @Body(new ParseArrayPipe ({ items: ChaveCreateDTO }))
    data : ChaveCreateDTO[]
  ) {
    return this.chaveService.add(data);
  }

  @UseGuards(CommerceGuard)
  @Post('commerce/versao')
  getVersao(@Body() data: getVersaoDTO) {
    return this.chaveService.getVersao(data);
  }

  @UseGuards(CommerceGuard)
  @Post('commerce/update/versao')
  updateVersao(@Body() data: updateVersaoDTO) {
    return this.chaveService.updateVersao(data);
  }

  @UseGuards(CommerceGuard)
  @Post('commerce/update/chave')
  updateChave(@Body() data: updateChaveDTO) {
    return this.chaveService.updateChave(data);
  }
}
