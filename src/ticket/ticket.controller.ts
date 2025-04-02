import { Controller, UseGuards, Post, Req, Res, Body, Get, UseFilters, UseInterceptors, UploadedFiles, UploadedFile, Logger, Param, Header, Delete, ParseArrayPipe } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { Request, Response } from 'express'
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {TicketService} from './ticket.service';
import {TicketAddDTO, AcaoAddDTO, TicketAcaoAddDTO, ChangeSituacaoDTO, TicketFilterDTO, AcaoAnexoDownloadDTO, allUsersFromTicketDTO, SituacaoAddDTO, SituacaoUpdateDTO, UrgenciaUpdateDTO, UrgenciaAddDTO} from './ticket.dto';
import {DBExceptionFilter} from 'src/shared/db.filter';
import {AcaoService} from './acao.service';
import {SituacaoEntity} from './situacao.entity';
import {SituacaoService} from './situacao.service';
import {Roles} from 'src/shared/roles.decorator';
import {UrgenciaEntity} from './urgencia.entity';
import {UrgenciaService} from './urgencia.service';
import * as sharp from 'sharp'
import * as fs from 'fs'

var path = require('path')

@UseGuards(JwtAuthGuard)
@Controller('ticket')
export class TicketController {
  constructor(
    private ticketService: TicketService,
    private acaoService: AcaoService,
    private situacaoService: SituacaoService,
    private urgenciaService: UrgenciaService,
  ) {}
 
  @UseFilters(DBExceptionFilter)
  @Post('all-users-from-ticket')
  allUsersFromTicket (@Req() req, @Body() data: allUsersFromTicketDTO) {
    return this.ticketService.allUsersFromTicket(data.cdticketArray, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Post('upsert')
  async addTicket (@Req() req, @Body() data: TicketAddDTO) {
    const emitAcao = data.emitAcao === true
    delete data.emitAcao
    
    const ret = await this.ticketService.addTicket(data, null, req.user, null, emitAcao)
    return ret
  }

  @UseFilters(DBExceptionFilter)
  @Get('kanban')
  kanban (@Req() req) {
    return this.ticketService.kanban(req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Get('all/:cd')
  getTicket (@Req() req, @Param('cd') cd : number) {
    return this.ticketService.getTicket(req.user, cd)
  }

  @UseFilters(DBExceptionFilter)
  @Get('acao/all/:cdticket')
  allAcao (@Req() req, @Param('cdticket') cdticket: number) {
    return this.acaoService.allAcao(cdticket, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Delete('acao/delete/:cdacao')
  deleteAcao (@Req() req, @Param('cdacao') cdacao: number){
    this.acaoService.delete(cdacao, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Post('all-filter')
  allFilter (@Req() req, @Body() data: TicketFilterDTO) {
    return this.ticketService.allFilter(data, req.user)
  }
  
  @UseFilters(DBExceptionFilter)
  @Post('all-filter/paginate')
  allFilterPaginate (@Req() req, @Body() data: TicketFilterDTO) {
    return this.ticketService.allFilterPaginate(data, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Post('add-ticket-acao')
  addTicketAcao (@Req() req, @Body() data: TicketAcaoAddDTO) {
    return this.ticketService.addTicketAcao(data, req.user)
  } 

  @UseFilters(DBExceptionFilter)
  @Post('acao/add')
  addAcao (@Req() req, @Body() data: AcaoAddDTO) {
    data.cduser = req.user.cd
    return this.acaoService.addAcao(data, req.user, null, true)
  }

  @Post('upload/:ticketcd/:acaocd')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: any) {
    return
  }

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('upload'))
  async uploadImage(@UploadedFile() file, @Req() req: Request) { 
    const { filename, path } = file;
    const cdatendimento = req.get('cd-atendimento')
    const ref = `${cdatendimento ? cdatendimento + '-' : ''}${filename}.webp`;

    await sharp(path)
      .webp({ quality: 20 })
      .toFile("./anexos/images/" + ref);
    
    fs.rmSync(path)
    return {
      url: `${process.env.BACKEND_URL}/static-images/${ref}`
    }
  }

  @Post('download')
  downloadFile(@Req() req: Request, @Res() res: Response, @Body() data: AcaoAnexoDownloadDTO) {
    const filePath = path.resolve(`./anexos/${data.cdticket}/${data.cdacao}/${data.nmfile}`)
    res.sendFile(filePath)
  }

  @UseFilters(DBExceptionFilter)
  @Get('all-meta')
  allMeta (@Req() req) {
    return this.ticketService.allMeta()
  }

  @UseFilters(DBExceptionFilter)
  @Post('change-situacao')
  changeSituacao (@Req() req, @Body() data: ChangeSituacaoDTO) {
    return this.ticketService.changeSituacao(data, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Post('update-kanban-order')
  updateJslistaKanban (@Req() req, @Body() data: any) {
    return this.ticketService.updateKanbanOrder(data, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Post('acao/start-servico/:cdacao')
  async startServicoAcao (@Req() req, @Param('cdacao') cdacao : number) {
    await this.acaoService.startServico(cdacao, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Post('acao/stop-servico')
  async stopServicoAcao (@Req() req) {
    await this.acaoService.stopServico(req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Get('acao/:cdacao')
  getAcao (@Req() req, @Param('cdacao') cdacao : number) {
    return this.acaoService.getAcao(cdacao, req.user)
  }

  @UseFilters(DBExceptionFilter)
  @Get('situacao/all')
  async situacaoAll () : Promise<SituacaoEntity[]> {
    return this.situacaoService.all()
  }

  @UseFilters(DBExceptionFilter)
  @Roles('cadastro')
  @Post('situacao/update')
  async situacaoUpdate (@Body(new ParseArrayPipe({ items: SituacaoUpdateDTO })) data: SituacaoUpdateDTO[]) : Promise<void> {
    await this.situacaoService.update(data)
  }

  @UseFilters(DBExceptionFilter)
  @Roles('cadastro')
  @Post('situacao/add')
  async situacaoAdd (@Body(new ParseArrayPipe({ items: SituacaoAddDTO })) data: SituacaoAddDTO[]) : Promise<void> {
    await this.situacaoService.add(data)
  }

  @UseFilters(DBExceptionFilter)
  @Post('situacao/delete/:cd')
  async situacaoDelete (@Param('cd') cd: number) : Promise<void> {
    await this.situacaoService.delete(cd)
  }

  @UseFilters(DBExceptionFilter)
  @Get('urgencia/all')
  async urgenciaAll () : Promise<UrgenciaEntity[]> {
    return this.urgenciaService.all()
  }

  @UseFilters(DBExceptionFilter)
  @Roles('cadastro')
  @Post('urgencia/update')
  async urgenciaUpdate (@Body(new ParseArrayPipe({ items: UrgenciaUpdateDTO })) data: UrgenciaUpdateDTO[]) : Promise<void> {
    await this.urgenciaService.update(data)
  }

  @UseFilters(DBExceptionFilter)
  @Roles('cadastro')
  @Post('urgencia/add')
  async urgenciaAdd (@Body(new ParseArrayPipe({ items: UrgenciaAddDTO })) data: UrgenciaAddDTO[]) : Promise<void> {
    await this.urgenciaService.add(data)
  }

  @UseFilters(DBExceptionFilter)
  @Roles('cadastro')
  @Post('urgencia/delete/:cd')
  async urgenciaDelete (@Param('cd') cd: number) : Promise<void> {
    await this.urgenciaService.delete(cd)
  }
}
