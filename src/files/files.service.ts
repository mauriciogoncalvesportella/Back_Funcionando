import { Injectable } from '@nestjs/common';
import {TicketFilterDTO} from 'src/ticket/ticket.dto';
import {TicketService} from 'src/ticket/ticket.service';
import { Response } from 'express'
import { utcToZonedTime, format } from 'date-fns-tz'
import {InjectRepository} from '@nestjs/typeorm';
import {ChaveEntity} from 'src/chave/chave.entity';
import {Repository} from 'typeorm';
import {UserEntity} from 'src/user/user.entity';
import {AtendimentoEntity} from 'src/atendimento/atendimento.entity';

@Injectable()
export class FilesService {
  constructor(
    private ticketService: TicketService,
    @InjectRepository(ChaveEntity)
    private chaveRepository: Repository<ChaveEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {  }

  downloadTicketTableCSV (res: Response, user: any, filter: TicketFilterDTO) {
    const transform: Function = (arr: any[], textKey: string): any => {
      return arr.reduce((prev, curr) => {
        prev[curr.cd] = curr[textKey]
        return prev
      }, {})
    }

    return new Promise<void>(async (resolve, reject) => {
      const ticketStream = await this.ticketService.allFilterQueryBuilder(filter, user).stream()
      let check = {};

      res.write('ID;Dt. Criação;Tipo;Iniciado Por;Cliente;Motivo;Assunto;Urgência;Situacao;Tempo minutos\n')
      
      let { situacao, motivo, urgencia } = await this.ticketService.allMeta();
      let users = await this.userRepository.find()
      let chaves = await this.chaveRepository.find()
      users = transform(users, 'idlogin')
      situacao = transform(situacao, 'nmsituacao')
      motivo = transform(motivo, 'nmmotivo')
      urgencia = transform(urgencia, 'nmurgencia')
      chaves = transform(chaves, 'idfantasia')
      let totalTime: number = 0

      ticketStream.on('data', async data => {
        const data2 = data as any
        if (!check[data2.ticket_cd]) {
          let entity: AtendimentoEntity = new AtendimentoEntity()
          entity.jslista = data2.atendimento_jslista
          totalTime += entity.tempoTotal

          const dtCriacao = utcToZonedTime(data2.ticket_dtcriacao, 'America/Sao_Paulo')
          let line: string = `${data2.ticket_cd};`
          line += `${format(dtCriacao, 'HH:MM dd/MM/yyyy', { timeZone: 'America/Sao_Paulo' })};`
          line += `${data2.ticket_fgticket};`
          line += `${users[data2.atendimento_cduserCd]};`
          line += `${chaves[data2.atendimento_cdchaveCd]};`
          line += `${motivo[data2.atendimento_cdmotivoCd]};`
          line += `${data2.ticket_nmtitulo};`
          line += `${urgencia[data2.ticket_cdurgenciaCd] ?? ''};`
          line += `${situacao[data2.ticket_cdsituacaoCd]};`,
          line += `${(entity.tempoTotal / 6e4).toFixed(1)}\n` 
          res.write(line)
          check[data2.ticket_cd] = true
        }
      })

      ticketStream.on('close', () => {
        res.write(`TOTAL;-;-;-;-;-;-;-;-;${(totalTime / 3600000).toFixed(1)} horas`)
        res.end()
        resolve()
      })
    })
  }
}
