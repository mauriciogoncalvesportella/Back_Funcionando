import {Inject, ForbiddenException, forwardRef, BadRequestException} from "@nestjs/common";
import {InjectRepository, InjectConnection} from "@nestjs/typeorm";
import {AcaoEntity} from "./acao.entity";
import {Repository, EntityManager, Connection} from "typeorm";
import {TicketEntity} from "./ticket.entity";
import {SolicitanteEntity} from "src/chave/solicitante.entity";
import {UrgenciaEntity} from "./urgencia.entity";
import {UserEntity} from "src/user/user.entity";
import {AcaoAddDTO} from "./ticket.dto";
import {TicketService} from "./ticket.service";
import {ServicoEntity} from "./servico.entity";
import {ServicoService} from "./servico.service";
import {AtendimentoService} from "src/atendimento/atendimento.service";

export class AcaoService {
  constructor(
    private atendimentoService: AtendimentoService,
    private servicoService: ServicoService,

    @Inject(forwardRef(() => TicketService))
    private ticketService: TicketService,

    @InjectRepository(AcaoEntity)
    private acaoRepository: Repository<AcaoEntity>,
    
    @InjectRepository(ServicoEntity)
    private servicoRepository: Repository<ServicoEntity>,

    @InjectRepository(SolicitanteEntity)
    private solicitanteRepository: Repository<SolicitanteEntity>,
    
    @InjectRepository(UrgenciaEntity)
    private urgenciaRepository: Repository<UrgenciaEntity>,
    
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    
    @InjectRepository(TicketEntity)
    private ticketRepository: Repository<TicketEntity>,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async getAcao (cdacao : number, user, currManager : EntityManager = null) {
    let manager = currManager || this.connection.manager
    return await manager.findOneOrFail(AcaoEntity, cdacao, { relations: [ 'cdservico' ] })
  }

  async allAcao (cdticket: number, user: any) {
    if (!user.roles.find(it => it === 'tickets.others')) {
      const ticket = await this.ticketRepository.findOne({
        where: { cd: cdticket },
        relations: [ 'users' ],
      })
      if (!ticket.users.find(it => it.cd === user.cd)) {
        throw new ForbiddenException
      }
    }

    return await this.acaoRepository.find({
      where: {
        cdticket: cdticket,
      },
      relations: ['cdservico'],
      order: {
        cd: 'DESC',
      },
    })
  }

  async startServico (cdacao: number, user : any, customManager : EntityManager = null) {
    let manager = customManager || this.connection.manager
    const acao = await manager.findOneOrFail(AcaoEntity, cdacao)
    if (!acao._cdservico) {
      throw new BadRequestException
    }

    if (acao._cduser !== user.cd) {
      throw new ForbiddenException
    }

    await this.servicoService.start(user, acao._cdservico, manager)
    await this.atendimentoService.stopStart({
      cdatendimento: -1,
    }, user)
  }

  async stopServico (user : any, manager : EntityManager = null) {
    await this.servicoService.stopAll(user, manager)
  }

  async closeServico (user: any, acao: AcaoEntity, manager : EntityManager = this.connection.manager) {
    const ntotal = await this.servicoService.close(user, acao.cdservico, manager)
    if (ntotal > 0) {
      /*
      await manager.createQueryBuilder()
        .update(TicketEntity)
        .set({ ntotal: ntotal })
        .where('cd = :cd', { cd: acao.cdticket })
        .execute()
      */
    }
  }

  async delete (cdacao, user) {
    const acao = await this.acaoRepository.findOneOrFail(cdacao)
    await this.connection.transaction(async (manager: EntityManager) => {
      const cdservico = acao._cdservico
      await manager.delete(AcaoEntity, cdacao)
      if (cdservico) {
        await manager.delete(ServicoEntity, cdservico)
      }
    })
  }

  async addAcaoAfterTicketUpdate (oldTicket: any, newTicket: TicketEntity, user : any, manager : EntityManager = null) {
    const oldUsersArray = oldTicket.users.map(curr => curr.cd)
    const newUsersArray = newTicket.users.map(curr => curr.cd)
    const removedUsers = oldTicket.users.filter(currUser => !newUsersArray.includes(currUser.cd))
    const addedUsers = newTicket.users.filter(currUser => !oldUsersArray.includes(currUser.cd))
    // <p><strong>Pessoas Vinculadas</strong><br>+ Daniel<br>- Leonardo</p>
    // Usuários vinculados
    let nmAcao : string[] = [] 
    let mmAcao : string = ''

    if (oldTicket.fgticket != newTicket.fgticket) {
      nmAcao.push(`Tipo Ticket`)
      const fgticket = ['Público', 'Interno']
      mmAcao += `<p><strong>Tipo Ticket</strong><br>${fgticket[oldTicket.fgticket]} <strong>-></strong> ${fgticket[newTicket.fgticket]}`
    }

    if (oldTicket.cdsolicitante.cd != newTicket.cdsolicitante) {
      nmAcao.push('Solicitante')
      const newSolicitante = await this.solicitanteRepository.findOneOrFail(newTicket.cdsolicitante)
      mmAcao += `<p><strong>Solicitante</strong><br>${oldTicket.cdsolicitante.idsolicitante} <strong>-></strong> ${newSolicitante.idsolicitante}</p>` 
    }

    if (oldTicket.cdsistema != newTicket.cdsistema) {
      nmAcao.push('Sistema')
      const cdsistema = ['Commerce', 'Coletas', 'Tablet']
      mmAcao += `<p><strong>Sistema</strong><br>${cdsistema[oldTicket.cdsistema]} <strong>-></strong> ${cdsistema[newTicket.cdsistema]}`
    }

    if (oldTicket.cdurgencia.cd != newTicket.cdurgencia) {
      nmAcao.push('Urgência')
      const newUrgencia = await this.urgenciaRepository.findOneOrFail(newTicket.cdurgencia)
      mmAcao += `<p><strong>Urgência</strong><br>${oldTicket.cdurgencia.nmurgencia} <strong>-></strong> ${newUrgencia.nmurgencia}`
    }

    if (removedUsers.length > 0 || addedUsers.length > 0) {
      nmAcao.push('Pessoas')
      mmAcao += `<p><strong>Pessoas Vinculadas</strong><br>`
      for (const user of addedUsers) {
        const userEntity = await this.userRepository.findOneOrFail(user)
        mmAcao += `<strong>+</strong> ${userEntity.idnome}<br>`
      }
      for (const user of removedUsers) {
        mmAcao += `<strong>-</strong> ${user.idnome}<br>`
      }
      mmAcao += '</p>'
    }

    if (mmAcao) {
      const addAcaoDTO = new AcaoAddDTO
      addAcaoDTO.cduser = user.cd
      addAcaoDTO.cdticket = newTicket.cd
      addAcaoDTO.nmassunto = `Alteração Ticket (${nmAcao.join(', ')})`
      addAcaoDTO.mmdesc = mmAcao
      addAcaoDTO.fgstatus = 1
      await this.addAcao(addAcaoDTO, user, manager, false)
    }
  }

  async addAcao (data: AcaoAddDTO, user: any, manager : EntityManager = null, validateCdticket) {
    if (validateCdticket) {
      let ticket = await this.ticketRepository.findOneOrFail({
        where: { cd: data.cdticket },
        relations: [ 'users' ],
      })
      

      if (!user.roles.includes('tickets.others.rewrite') && !ticket.users.find(it => it.cd === user.cd)) {
        throw new ForbiddenException
      }

      if (ticket._cdsituacao === 4 && data.cdsituacao !== ticket._cdsituacao) {
        await this.connection.transaction(async (currManager : EntityManager) => {
          if (ticket._cdurgencia == null) {
            await currManager
              .createQueryBuilder()
              .update('tticket')
              .set({
                cdurgencia: '1'
              })
              .where("cd = :cd", {cd: data.cdticket})
              .execute()
          }

          if (ticket.dtprevisao == null) {
            await currManager
              .createQueryBuilder()
              .update('tticket')
              .set({
                dtprevisao: new Date().toISOString()
              })
              .where("cd = :cd", {cd: data.cdticket})
              .execute()
          }

          const jsKanban = {}
          
          for (const us of ticket._cdusers) {
            jsKanban[us.toString()] = 999999
          }
          
          await currManager
            .createQueryBuilder()
            .update('tticket')
            .set({
              jskanbanorder: jsKanban
            })
            .where("cd = :cd", {cd: data.cdticket})
            .execute()

        })
      }
    }

    let acao = this.acaoRepository.create(data)
    if (manager) {
      acao = await manager.save(acao)
    } else {
      await this.connection.transaction(async (currManager : EntityManager) => {
        if (acao.fgstatus === 0) {
          let servico = new ServicoEntity()
          servico.cduser = acao.cduser
          servico = await currManager.save(servico)
          acao.cdservico = servico.cd
          // await this.startServico(, user)
          await this.servicoService.start(user, servico.cd, currManager)
          await this.atendimentoService.stopStart({ cdatendimento: -1 }, user, currManager)
        } else if (acao.fgstatus === 1) {
          await this.closeServico(user, acao, currManager)
          // const ntotal = await this.servicoService.close(user, acao.cdservico, currManager)
        }
        acao = await currManager.save(acao)
        if (data.cdsituacao) {
          await this.ticketService.changeSituacao({ cd: data.cdticket, cdsituacao: data.cdsituacao }, user, currManager)
        }
        if (data.cdresponsavel) {
          await this.ticketService.changeCdresponsavel(data.cdticket, data.cdresponsavel, user, currManager)
        }
      })
    }

    return {
      cd: acao.cd,
    }
  }
}
