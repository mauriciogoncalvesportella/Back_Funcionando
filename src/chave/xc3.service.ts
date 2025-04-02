import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ChaveFoneEntity} from "./chavefone.entity";
import {Repository} from "typeorm";
import {WebsocketGateway} from "src/websocket/websocket.gateway";
import {ChaveEntity} from "./chave.entity";
import {UserEntity} from "src/user/user.entity";
import {AtendimentoService} from "src/atendimento/atendimento.service";
import {AtendimentoAddDTO} from "src/atendimento/atendimento.dto";

@Injectable()
export class Xc3Service {
  constructor (
    @InjectRepository(ChaveFoneEntity)
    private chaveFoneRepository: Repository<ChaveFoneEntity>, 
    @InjectRepository(ChaveEntity)
    private chaveRepository: Repository<ChaveEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private websocketGateway: WebsocketGateway,
    private atendimentoService: AtendimentoService
  ) {}

  async addAtendimento (idRamal: string, cdchave: number) {
    const userEntity = await this.userRepository.findOneOrFail({ where: { idRamal } })
    const chaveEntity = await this.chaveRepository.findOneOrFail(cdchave)
    const user = {
      cd: userEntity.cd,
      idlogin: userEntity.idlogin,
      roles: []
    }
    const atendimentoDto: AtendimentoAddDTO = {
      cdchave, 
      cdorigem: 9,
      cdmotivo: 9,
      cdfila: undefined
    }
    await this.atendimentoService.add(atendimentoDto, user)
    this.websocketGateway.notifyUser('refreshAtendimento', chaveEntity.idfantasia, user.cd)
  }

  async getFoneList () {
    const entities = await this.chaveFoneRepository.find({ where: { cdchave: null } })
    return entities.map(entity => entity.fone)
  }

  async addFone (fone: string) {
    const chaveFoneEntity = this.chaveFoneRepository.create({ fone })
    await this.chaveFoneRepository.insert(chaveFoneEntity)
    this.websocketGateway.notifyRoom('Fone', 'add', fone)
  }

  async bind (fone: string, cdchave: number, idnome: string = '') {
    const chaveFoneEntity = await this.chaveFoneRepository.findOneOrFail({ fone })
    chaveFoneEntity.cdchave = cdchave
    chaveFoneEntity.idnome = idnome ?? chaveFoneEntity.idnome
    await this.chaveFoneRepository.save(chaveFoneEntity)
    this.websocketGateway.notifyRoom('Fone', 'remove', fone)
  }

  async getClientInfo (phone: string) {
    const chaveFoneEntity = await this.chaveFoneRepository.findOne({
      where: { fone: phone },
    })
    if (chaveFoneEntity != undefined && chaveFoneEntity._cdchave != undefined) {
      const chaveEntity: ChaveEntity = await this.chaveRepository.findOneOrFail(chaveFoneEntity._cdchave)
      const userEntity: UserEntity = chaveEntity._cdresponsavel == undefined
        ? null
        : await this.userRepository.findOne({ where: { cd: chaveEntity._cdresponsavel } })
      return {
        status: 'OK',
        phone: phone,
        name: chaveEntity.idfantasia,
        code: chaveEntity.cd,
        indebt: chaveEntity.dtvalidade < new Date(),
        supervisor: userEntity?.idRamal ?? "",
      }
    }
    if (chaveFoneEntity == undefined) {
      await this.addFone(phone)
    }
    return {
      status: 'WAITING'
    }
  }
}
