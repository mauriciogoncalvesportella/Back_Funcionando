import {Controller, Get, Query, UseGuards, Logger, Post, Body, BadRequestException, InternalServerErrorException} from "@nestjs/common";
import {Xc3Service} from "./xc3.service";
import {Xc3Guard} from "./xc3.guard";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {AtendimentoService} from "src/atendimento/atendimento.service";

@Controller('3cx')
export class Xc3Controller {
  constructor (
    private xc3Service: Xc3Service
  ){}

  // @UseGuards(Xc3Guard)
  @Post('phone-info')
  async getFoneInfo (@Query('phone') fone: string) {
    try {
      if (!fone) {
        throw new Error('phone is null')
      }
      return await this.xc3Service.getClientInfo(fone)
    } catch (err) {
      console.error(err)
      return new InternalServerErrorException({
        status: 'ERROR',
        message: err.message ?? err
      })
    }
  }

  // @UseGuards(Xc3Guard)
  @Post('add')
  async addAtendimento (@Query('ramal') ramal: string, @Query('code') cdchave: number) {
    await this.xc3Service.addAtendimento(ramal, cdchave)
  }

  @UseGuards(JwtAuthGuard)
  @Post('bind')
  async bind (@Body() data: any) {
    const { fone, cdchave } = data
    if (fone || cdchave) {
      this.xc3Service.bind(fone, cdchave, data.idnome)
      return
    }
    throw new BadRequestException('Fone or Chave null')
  }

  @UseGuards(JwtAuthGuard)
  @Get('fone-list')
  async getFoneList () {
    return await this.xc3Service.getFoneList()
  }
}
