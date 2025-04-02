import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { AtendimentoAddDTO, AtendimentoUpdateDTO, OrigemAddDTO, OrigemUpdateDTO } from './atendimento.dto';
import {OrigemEntity} from './origem.entity';
import {CadastroServiceInterface} from 'src/shared/interfaces';

@Injectable()
export class OrigemService implements CadastroServiceInterface {
  constructor(
    @InjectRepository(OrigemEntity)
    private origemRepository: Repository<OrigemEntity>,
  ) {}

  async add (data: OrigemAddDTO) : Promise<OrigemEntity> {
    return await this.origemRepository.save(data)
  }

  async all () : Promise<OrigemEntity[]> {
    return await this.origemRepository.find()
  }

  async update (data: OrigemUpdateDTO[]) : Promise<OrigemEntity[]> {
    return await this.origemRepository.save(data)
  }

  async delete (cd: number) {
    await this.origemRepository.delete(cd)
  }

  async nextOrdem () : Promise<number> {
    const maxOrdem = await this.origemRepository.createQueryBuilder('origem')
      .select('MAX(origem.nordem)', 'max')
      .getRawOne()

    if (maxOrdem.max == null) {
      return 0
    }
    return maxOrdem.max + 1
  }
}
