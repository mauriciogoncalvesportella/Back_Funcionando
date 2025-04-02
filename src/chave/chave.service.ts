import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { ChaveEntity } from './chave.entity';
import { Repository, Connection } from 'typeorm';
import { ChaveCreateDTO, getVersaoDTO, updateVersaoDTO, updateChaveDTO, addSolicitanteDTO, updateDtvalidadeDTO, AllChavesFonesDTO, UpdateChaveFoneDTO, CreateChaveFoneDTO } from './chave.dto';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { SolicitanteEntity } from './solicitante.entity';
import {add, set, addDays} from 'date-fns';
import {ChaveFoneEntity} from './chavefone.entity';

@Injectable()
export class ChaveService {
  constructor(
    @InjectRepository(SolicitanteEntity)
    private solicitanteRepository: Repository<SolicitanteEntity>,
    @InjectRepository(ChaveEntity)
    private chaveRepository: Repository<ChaveEntity>,
    @InjectRepository(ChaveFoneEntity)
    private chaveFoneRepository: Repository<ChaveFoneEntity>,
    @InjectConnection()
    private connection: Connection
  ){}

  async add(listChavesDTO: ChaveCreateDTO[]) {
    const listChaves = this.chaveRepository.create(listChavesDTO)
    await this.chaveRepository.save(listChaves);
  }

  async addSolicitante(item: addSolicitanteDTO) {
    const solicitante = await this.solicitanteRepository.save(item)
    return solicitante.cd
  }

  async updateDtvalidade (dto: updateDtvalidadeDTO) {
    let chave = await this.chaveRepository.findOneOrFail({ cd: dto.cdchave })
    chave.dtvalidade = addDays(set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }), dto.days + 1)
    await this.chaveRepository.save(chave)
    return { dtvalidade: chave.dtvalidade }
  }

  async getAllChaves() {
    return await this.chaveRepository.find({ cdsistema: 1 });
  }

  async getAllChavesFones (dto: AllChavesFonesDTO) {
    return await this.chaveRepository
      .createQueryBuilder('chave')
      .innerJoinAndSelect('chave.chaveFones', 'fones')
      .where(`UPPER(fones.fone) like UPPER(:search) or
        UPPER(fones.idnome) like UPPER(:search) or
        UPPER(chave.idcnpj) like UPPER(:search) or
        UPPER(chave.nmrazao) like UPPER(:search) or
        UPPER(chave.idfantasia) like UPPER(:search)
      `, { search: `%${dto.search ?? ''}%` })
      .skip(dto.skip)
      .take(dto.take)
      .addOrderBy('chave.idfantasia')
      .addOrderBy('fones.idnome')
      .addOrderBy('fones.fone')
      .getMany()
  }

  async updateChaveFone (dto: UpdateChaveFoneDTO) {
    const entity = await this.chaveFoneRepository.findOneOrFail(dto.cd)
    entity.idnome = dto.idnome ?? entity.idnome
    entity.fone = dto.fone ?? entity.fone
    return await this.chaveFoneRepository.save(entity)
  }

  async createChaveFone (dto: CreateChaveFoneDTO) {
    const entity = new ChaveFoneEntity()
    entity.fone = dto.fone
    entity.idnome = dto.idnome.toUpperCase()
    entity.cdchave = dto.cdchave
    return await this.chaveFoneRepository.save(entity)
  }

  async deleteChaveFone (cd: number) {
    console.log(cd)
    await this.chaveFoneRepository.delete({ cd: cd })
  }

  async getVersao(data: getVersaoDTO) {
      try {
      let chave = await this.chaveRepository.findOne({ idcnpj: data.idcnpj, cdsistema: data.cdsistema });
      
      if (!chave) {
        throw new HttpException('Not found', HttpStatus.BAD_REQUEST)
      }

      let { idversaoexe, idversaodb, dtatualizacao } = chave;
      return { idversaoexe, idversaodb, dtatualizacao };
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new HttpException('Entity not found', HttpStatus.NOT_FOUND)
      }

      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateVersao(data: updateVersaoDTO) {
    try {
      let chave = await this.chaveRepository.findOneOrFail({ idcnpj: data.idcnpj, cdsistema: data.cdsistema });
      if (data.idversaoexe)
        chave.idversaoexe = data.idversaoexe;
      if (data.idversaodb)
        chave.idversaodb = data.idversaodb;
      return await this.chaveRepository.save(chave);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new HttpException('Entity not found', HttpStatus.NOT_FOUND)
      }
 
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateChave(data: updateChaveDTO) {
    try {
      let chave = await this.chaveRepository.findOneOrFail({ idcnpj: data.idcnpj, cdsistema: data.cdsistema });
      chave.dschave = data.dschave
      chave.nrcontrole = data.nrcontrole
      chave.nrusuarios = data.nrusuarios
      chave.nrempresas = data.nrempresas
      chave.dtexpedicao = new Date(data.dtexpedicao)
      chave.dtvalidade = new Date(data.dtvalidade)
      chave.dtatualizacao = new Date()
      await this.chaveRepository.save(chave)
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new HttpException('Entity not found', HttpStatus.NOT_FOUND)
      }

      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async allSolicitantesFromChave(cd: Number) {
    try {
      return await this.solicitanteRepository.find({ cdchave: cd })
    } catch (err) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
